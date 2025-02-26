export default {
	current: null,
	stack: {},
	stacks: {},
	getStack(key = null) {
		if (key) {
			stacks.value[key] = stacks.value[key] || [];
			return stacks.value[key];
		}
		return stack;
	},
	active(win) {
		current.value = win.$.uid;
	},
	disable() {
		current.value = null;
	},
	isActive(win) {
		return current.value === win.$.uid;
	},
	add(win) {
		if (win.wmGroup) {
			let o = this.getStack(win.wmGroup)[0] || null;
			o = ((o || {}).$ || {}).uid || 0;
			delete stack.value[o];
			this.getStack(win.wmGroup).push(win);
			this.getStack(win.wmGroup).sort((a, b) => a.wmSort - b.wmSort);
			let n = this.getStack(win.wmGroup)[0];
			stack.value[n.$.uid] = n;
		} else {
			stack.value[win.$.uid] = win;
		}
	},
	del(win) {
		if (win.wmGroup) {
			const i = this.getStack(win.wmGroup).findIndex(
				(w) => w.$.uid === win.$.uid
			);
			if (i > -1) {
				this.getStack(win.wmGroup).splice(i, 1);
				this.getStack(win.wmGroup).sort((a, b) => a.wmSort - b.wmSort);
				delete stack.value[win.$.uid];
				let n = this.getStack(win.wmGroup)[0];
				if (n) {
					stack.value[n.$.uid] = n;
				}
			}
		} else {
			delete stack.value[win.$.uid];
		}
	},
};
