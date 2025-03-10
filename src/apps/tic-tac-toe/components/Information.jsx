import { Box } from "../../../shared/internal/box";
import store from "../store";

export function Information() {
	const { currentPlayer, isGameEnded, isDraw } = store();
	let message = `Ходит: ${currentPlayer}`;
	if (isDraw) {
		message = "Ничья";
	} else if (isGameEnded) {
		message = `Выиграл: ${currentPlayer}`;
	}
	return (
		<Box.Header lavel={3} className="text-2xl">
			{message}
		</Box.Header>
	);
}
