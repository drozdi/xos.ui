import { create } from "zustand";

export class History {
	constructor(fn) {
		this.histories = [];
		this.index = -1;
		this.listeners = [];
		this.fn = fn;
	}
	subscribe(listener) {
		this.listeners = [...this.listeners, listener];
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}
	getSnapshot() {
		return this;
	}
	canGoBack() {
		return this.index <= 0;
	}
	canGoForward() {
		return this.index === this.histories.length - 1;
	}
	isCurrent(history) {
		return this.histories[this.index] === history;
	}
	current() {
		return this.histories[this.index];
	}
	isEmpty() {
		return this.histories.length === 0;
	}
	back(callback) {
		if (this.index > 0) {
			this.index--;
			this.fn?.(this.histories[this.index]);
			callback?.();
		}
	}
	forward(callback) {
		if (this.index < this.histories.length - 1) {
			this.index++;
			this.fn?.(this.histories[this.index]);
			callback?.();
		}
	}
	add(history) {
		this.index++;
		this.histories = this.histories.slice(0, this.index);
		this.histories.push(history);
		this.fn?.(history);
	}
	del() {
		this.histories.splice(this.index, 1);
		this.index--;
		this.fn?.(this.histories[this.index]);
	}
	init({ histories = [], index = -1 }) {
		this.histories = histories;
		this.index = index;
		this.fn?.(this.histories[this.index]);
	}
}

export function HistoryStore(fn) {
	return create((set, get) => ({
		histories: [],
		index: -1,
		canGoBack() {
			return get().index <= 0;
		},
		canGoForward() {
			return get().index === get().histories.length - 1;
		},
		isCurrent(history) {
			return get().histories[get().index] === history;
		},
		current() {
			return get().histories[get().index];
		},
		isEmpty() {
			return get().histories.length === 0;
		},
		add(history) {
			const index = ++get().index;
			const histories = get().histories.slice(0, index);
			histories.push(history);
			set({ ...get(), histories, index });
			fn?.(history);
		},
		del() {
			const histories = get().histories.splice(get().index, 1);
			const index = --get().index;
			set({ ...get(), histories, index });
			fn?.(histories[index]);
		},
		init({ histories = [], index = -1 }) {
			set({ ...get(), histories, index });
			fn?.(histories[index]);
		},
		back(callback) {
			if (get().index > 0) {
				const index = --get().index;
				fn?.(get().histories[index]);
				set({ ...get(), index });
				callback?.();
			}
		},
		forward(callback) {
			if (get().index < get().histories.length - 1) {
				const index = ++get().index;
				fn?.(get().histories[index]);
				set({ ...get(), index });
				callback?.();
			}
		},
	}));
}
