import { useFloating } from '@floating-ui/react';
import { useUncontrolled } from '../../hooks/use-controlled';

/**
* Хук usePopover возвращает объект с функциями и состоянием для работы с всплывающим окном.
* @param {Object} options - Параметры всплывающего окна.
* @param {boolean} options.opened - Начальное состояние всплывающего окна.
* @param {Function} options.onChange - Функция, которая будет вызвана при изменении состояния всплывающего окна.
* @param {string} options.strategy - Стратегия позиционирования всплывающего окна.
* @param {string} options.position - Позиция всплывающего окна.
* @returns {Object} - Объект с функциями и состоянием для работы с всплывающим окном.
*/
export function usePopover({
		opened,
		onChange,
		strategy = 'absolute',
		position = 'bottom',
	}) {
	const [_opened, setOpened] = useUncontrolled({
		initial: opened,
		onChange: onChange,
	});

	const onClose = () => {
	  if (_opened) {
		setOpened(false);
	  }
	};
  
	const onToggle = () => setOpened(!_opened);
  
	const floating = useFloating({
		open: _opened,
 		onOpenChange: setOpened,
	  	strategy: strategy,
	  	placement: position,
	});
  
 
	return {
	  floating,
	  controlled: typeof opened === 'boolean',
	  opened: _opened,
	  onClose,
	  onToggle,
	};
  }