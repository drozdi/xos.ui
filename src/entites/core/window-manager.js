export default {
	zIndex: 100,
	current: undefined,
	stack: {},
	stacks: {},
	setZIndex(zIndex) {
		this.zIndex = zIndex;
	},
	active(win) {
		this.current = win?.uid;
	},
	disable() {
		this.current = undefined;
	},
	isActive(win) {
		return this.current === win.uid;
	},
	add(win) {
		const stack = this.stack;
		const stacks = this.stacks;
		if (win.wmGroup) {
			stacks[win.wmGroup] = stacks[win.wmGroup] || [];

			let o = stacks[win.wmGroup][0] || null;
			o = (o || {}).uid || 0;
			delete stack[o];

			stacks[win.wmGroup].push(win);
			stacks[win.wmGroup].sort((a, b) => a.wmSort - b.wmSort);

			let n = stacks[win.wmGroup][0];
			stack[n.uid] = n;
		} else {
			stack[win.uid] = win;
		}
		this.stack = stack;
		this.stacks = stacks;
	},
	del(win) {
		const stack = stack.stack;
		const stacks = stack.stacks;
		if (win.wmGroup) {
			const i = stacks[win.wmGroup].findIndex((w) => w.uid === win.uid);
			if (i > -1) {
				stacks[win.wmGroup].splice(i, 1);
				stacks[win.wmGroup].sort((a, b) => a.wmSort - b.wmSort);
				delete stack[win.uid];
				let n = stacks[win.wmGroup][0];
				if (n) {
					stack[n.uid] = n;
				}
			}
		} else {
			delete stack[win.uid];
		}
		this.stack = stack;
		this.stacks = stacks;
	},
};
