export class EventBus {
	constructor() {
		this.bus = [];
	}
	on(key, handler) {
		this.bus[key] = this.bus[key] || [];
		this.bus[key]?.push(handler);
		return () => {
			this.off(key, handler);
		};
	}
	off(key, handler) {
		const index = this.bus[key]?.indexOf(handler) ?? -1;
		this.bus[key]?.splice(index >>> 0, 1);
	}

	once(key, handler) {
		const handleOnce = (...payload) => {
			handler(...payload);
			this.off(key, handleOnce);
		};

		this.on(key, handleOnce);
	}

	emit(key, ...payload) {
		this.bus[key]?.forEach((fn) => {
			try {
				fn(...payload);
			} catch (e) {
				console.error(e);
			}
		});
	}
}
