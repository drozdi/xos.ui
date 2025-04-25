export const createEventBus = () => {
	const listeners = new Map()
  
	return {
	  subscribe(event, callback) {
		if (!listeners.has(event)) listeners.set(event, new Set())
		listeners.get(event).add(callback)
		return () => listeners.get(event).delete(callback)
	  },
  
	  emit(event, ...args) {
		listeners.get(event)?.forEach(cb => cb(...args))
	  }
	}
  }
  
  // Инициализация в корне приложения
  export const eventBus = createEventBus()