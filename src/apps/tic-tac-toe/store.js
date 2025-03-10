import { create } from "zustand";

export default create((set, get) => ({
	field: Array(9).fill(""),
	isDraw: false,
	isGameEnded: false,
	currentPlayer: "X",
	setField(field) {
		set({
			...get(),
			field,
		});
	},
	setCurrentPlayer(currentPlayer) {
		set({
			...get(),
			currentPlayer,
		});
	},
	draw() {
		set({
			...get(),
			isDraw: true,
		});
	},
	endGame() {
		set({
			...get(),
			isGameEnded: true,
		});
	},
	restart() {
		set({
			field: Array(9).fill(""),
			isDraw: false,
			isGameEnded: false,
			currentPlayer: "X",
		});
	},
}));
