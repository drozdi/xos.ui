export const stack = {
	zIndex: 100,
	current: null,
	stack: {},
	stacks: {},
	getStack(key = null) {
		if (key) {
			this.stacks[key] = this.stacks[key] || [];
			return this.stacks[key];
		}
		return this.stack;
	},
	active(win) {
		this.current = win.uid;
	},
	disable() {
		this.current = null;
	},
	isActive(win) {
		return this.current === win.uid;
	},
	add(win) {
		if (win.wmGroup) {
			let o = this.getStack(win.wmGroup)[0] || null;
			o = ((o || {}).$ || {}).uid || 0;
			delete this.stack[o];
			this.getStack(win.wmGroup).push(win);
			this.getStack(win.wmGroup).sort((a, b) => a.wmSort - b.wmSort);
			let n = this.getStack(win.wmGroup)[0];
			this.stack[n.uid] = n;
		} else {
			this.stack[win.uid] = win;
		}
	},
	del(win) {
		if (win.wmGroup) {
			const i = this.getStack(win.wmGroup).findIndex(
				(w) => w.uid === win.uid
			);
			if (i > -1) {
				this.getStack(win.wmGroup).splice(i, 1);
				this.getStack(win.wmGroup).sort((a, b) => a.wmSort - b.wmSort);
				delete this.stack[win.uid];
				let n = this.getStack(win.wmGroup)[0];
				if (n) {
					this.stack[n.uid] = n;
				}
			}
		} else {
			delete this.stack[win.uid];
		}
	},
};
