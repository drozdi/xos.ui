import { useState } from "react";

/**
 * Функция useArray создает массив и предоставляет функции для работы с ним.
 * @param {Array} [initial=[]] - Начальное значение массива.
 * @returns {Array} - Массив и объект с функциями для работы с массивом.
 */
export function useArray(initial = []) {
	const [value, setValue] = useState(initial);

	/**
	 * Функция push добавляет элемент в конец массива.
	 * @param {*} element - Элемент, который нужно добавить.
	 */
	const push = (element) => setValue((a) => [...a, element]);

	/**
	 * Функция pop удаляет последний элемент из массива и возвращает его.
	 * @returns {*} - Удаленный элемент.
	 */
	const pop = () => {
		const current = [...value];
		const deleted = current.pop();
		setValue(current);
		return deleted;
	};

	/**
	 * Функция unshift добавляет элемент в начало массива.
	 * @param {*} value - Элемент, который нужно добавить.
	 */
	const unshift = (value) => {
		setValue((a) => [value, ...a]);
	};

	/**
	 * Функция shift удаляет первый элемент из массива и возвращает его.
	 * @returns {*} - Удаленный элемент.
	 */
	const shift = () => {
		const current = [...value];
		const deleted = current.shift();
		setValue(current);
		return deleted;
	};

	/**
	 * Функция filter фильтрует массив на основе переданной функции.
	 * @param {Function} fn - Функция, которая будет использоваться для фильтрации.
	 */
	const filter = (fn) => setValue((a) => a.filter(fn));

	/**
	 * Функция update обновляет элемент массива по указанному индексу.
	 * @param {number} index - Индекс элемента, который нужно обновить.
	 * @param {*} newItem - Новое значение элемента.
	 */
	const update = (index, newItem) =>
		setValue((a) => [
			...a.slice(0, index),
			newItem,
			...a.slice(index + 1, a.length),
		]);

	/**
	 * Функция remove удаляет элемент массива по указанному индексу.
	 * @param {number} index - Индекс элемента, который нужно удалить.
	 */
	const remove = (index) => {
		const current = [...value];
		current.splice(index, 1);
		setValue(current);
	};

	/**
	 * Функция findIndex находит индекс элемента в массиве на основе переданной функции.
	 * @param {...*} args - Аргументы, которые будут переданы в функцию findIndex.
	 * @returns {number} - Индекс элемента.
	 */
	const findIndex = (...args) => value.findIndex(...args);

	/**
	 * Функция clear очищает массив.
	 */
	const clear = () => setValue([]);

	return [
		value,
		{
			set: setValue,
			push,
			pop,
			unshift,
			shift,
			filter,
			update,
			remove,
			clear,
			findIndex,
		},
	];
}
