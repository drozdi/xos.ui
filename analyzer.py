import os
import requests
import time
from pathlib import Path

def analyze_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            code = file.read()
        response = requests.post(
            'http://localhost:11434/api/generate',
            json={
                "model": "deepseek-r1:7b",
                "prompt": f"Проверь этот код на ошибки и оптимизируй его:\n```\n{code}\n```",
                "stream": False
            },
        )
        if response.status_code == 200:
            return response.json()["response"]
        return f"Ошибка API: {response.status_code}"
    except Exception as e:
        return f"Ошибка при анализе: {str(e)}"


def save_analysis_result(project_path):
    analysis_dir = Path("code_analysis")
    analysis_dir.mkdir(exist_ok=True)

    relative_path = file_path.relative_to(Path.cwd())
    output_path = analysis_dir / f"{relative_path}.analysis.txt"
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"Анализ файла: {relative_path}\n")
        f.write("="*50 + "\n")
        f.write(analysis_text)
        f.write("\n" + "="*50 + "\n")

def scan_current_directory():
    print(f"Начинаем анализ текущей директории: {Path.cwd()}")
    
    # Проверяем существование директории src
    src_path = Path("src")
    if not src_path.exists():
        print("❌ Директория 'src' не найдена!")
        return

    for file in src_path.rglob('*'):
        if file.is_file() and file.suffix.lower() in ('.jsx', '.tsx', '.ts', '.js', '.css'):
            print(f"🔍 Анализируем: {file}")
            start_time = time.time()
            
            analysis = analyze_file(file)
            save_analysis_result(file, analysis)
            
            elapsed = time.time() - start_time
            print(f"✅ Готово ({elapsed:.1f} сек)")
            print(f"📝 Результат сохранен в: code_analysis/{file}.analysis.txt")

if __name__ == "__main__":
    try:
        scan_current_directory()
        print("\nАнализ завершен! Все результаты сохранены в папке 'code_analysis'")
    except KeyboardInterrupt:
        print("\nАнализ прерван пользователем")
