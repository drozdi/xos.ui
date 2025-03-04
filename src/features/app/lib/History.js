export class History {
	constructor(fn) {
		this.history = [];
		this.index = -1;
		this.fn = fn;
	}
	get length() {
		return this.history.length;
	}
	get isFirst() {
		return this.index === 0;
	}
	get isLast() {
		return this.index === this.length - 1;
	}
	back() {
		if (this.index > 0) {
			this.index--;
			this.fn?.(this.history[this.index]);
		}
	}
	up() {
		if (this.index < this.length - 1) {
			this.index++;
			this.fn?.(this.history[this.index]);
		}
	}
	add(history) {
		this.index++;
		this.history = this.history.slice(0, this.history.index);
		this.history.push(history);
		this.fn?.(history);
	}
	del() {
		this.history.splice(this.index, 1);
		this.index--;
		this.fn?.(this.history[this.index]);
	}
}
