import { create } from "zustand";
export const useWM = create((set, get) => ({
	zIndex: 100,
	current: null,
	stack: {},
	stacks: {},
	setZIndex: (zIndex) => set({ zIndex }),
	active: (win) => {
		get().current = win.uid;
	},
	disable: () => {
		set({ current: null });
	},
	isActive: (win) => {
		return get().current === win.uid;
	},

	add: (win) => {
		const stack = get().stack;
		const stacks = get().stacks;

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

		set({ stack, stacks });
	},
	del: (win) => {
		const stack = get().stack;
		const stacks = get().stacks;
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
		set({ stack, stacks });
	},

	/*bears: 0,
	increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
	updateBears: (newBears) => set({ bears: newBears }),*/
}));

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
