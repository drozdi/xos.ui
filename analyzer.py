import os
import requests
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm
import hashlib

def get_file_hash(file_path):
    """Вычисляет хэш файла для отслеживания изменений"""
    hasher = hashlib.md5()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b''):
            hasher.update(chunk)
    return hasher.hexdigest()

def analyze_file(file_path, model="deepseek-r1:7b"):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            code = file.read()
        
        response = requests.post(
            'http://localhost:11434/api/generate',
            json={
                "model": model,
                "prompt": f"Проверь этот код на ошибки, оптимизируй и предложи улучшения:\n```\n{code}\n```",
                "stream": False
            }
        )
        
        if response.status_code == 200:
            return response.json()["response"]
        return f"Ошибка API: {response.status_code} - {response.text}"
    except Exception as e:
        return f"Ошибка при анализе: {str(e)}"

def save_analysis_result(file_path, analysis_text, project_root):
    analysis_dir = project_root / "code_analysis"
    analysis_dir.mkdir(exist_ok=True)
    
    try:
        relative_path = file_path.relative_to(project_root)
    except ValueError:
        relative_path = Path(file_path.name)
    
    output_path = analysis_dir / f"{relative_path}.analysis.txt"
    hash_path = analysis_dir / f"{relative_path}.hash"
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    current_hash = get_file_hash(file_path)
    with open(hash_path, 'w', encoding='utf-8') as f:
        f.write(current_hash)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"Анализ файла: {relative_path}\n")
        f.write("="*80 + "\n")
        f.write(analysis_text)
        f.write("\n" + "="*80 + "\n")

def needs_analysis(file_path, project_root):
    """Проверяет, нужно ли анализировать файл"""
    analysis_dir = project_root / "code_analysis"
    
    try:
        relative_path = file_path.relative_to(project_root)
    except ValueError:
        relative_path = Path(file_path.name)
    
    hash_path = analysis_dir / f"{relative_path}.hash"
    
    if not hash_path.exists():
        return True
    
    try:
        with open(hash_path, 'r', encoding='utf-8') as f:
            saved_hash = f.read().strip()
        return get_file_hash(file_path) != saved_hash
    except:
        return True

def scan_project(project_root=None, max_workers=4):
    project_root = Path(project_root) if project_root else Path.cwd()
    print(f"🔍 Начинаем анализ проекта в: {project_root}")
    print(f"⚙️  Используется модель: deepseek-r1:7b")
    print(f"🧵 Максимальное количество потоков: {max_workers}")
    
    src_path = project_root / "src"
    if not src_path.exists():
        print("❌ Директория 'src' не найдена!")
        return
    
    files_to_analyze = []
    for file in src_path.rglob('*'):
        if file.is_file() and file.suffix.lower() in ('.jsx', '.tsx', '.ts', '.js', '.css'):
            if needs_analysis(file, project_root):
                files_to_analyze.append(file)
            else:
                print(f"⏩ Пропускаем (без изменений): {file.relative_to(src_path)}")
    
    if not files_to_analyze:
        print("✅ Все файлы уже проанализированы и не изменялись")
        return
    
    print(f"\n📂 Всего файлов для анализа: {len(files_to_analyze)}")
    
    progress = tqdm(total=len(files_to_analyze), desc="Анализ файлов", unit="file")
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(analyze_file, file): file for file in files_to_analyze}
        
        for future in as_completed(futures):
            file = futures[future]
            try:
                analysis = future.result()
                save_analysis_result(file, analysis, project_root)
                rel_path = file.relative_to(src_path)
                tqdm.write(f"✔️ Анализ завершен: {rel_path}")
            except Exception as e:
                tqdm.write(f"❌ Ошибка при анализе {file}: {str(e)}")
            finally:
                progress.update(1)
    
    elapsed = time.time() - start_time
    print(f"\n🎉 Анализ завершен за {elapsed:.2f} секунд")
    print(f"📂 Результаты сохранены в: {project_root / 'code_analysis'}")

if __name__ == "__main__":
    try:
        # Указываем явный путь к проекту, если нужно
        project_path = None  # или "c:/OSPanel/home/xos.ui"
        scan_project(project_root=project_path, max_workers=4)
    except KeyboardInterrupt:
        print("\n⏹ Анализ прерван пользователем")