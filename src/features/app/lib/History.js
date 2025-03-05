export class History {
	constructor(fn) {
		this.histories = [];
		this.index = -1;
		this.fn = fn;
	}
	get length() {
		return this.histories.length;
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
		if (this.index < this.length - 1) {
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
