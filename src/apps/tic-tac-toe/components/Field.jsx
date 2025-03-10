import store from "../store";

export function Field() {
	const { isGameEnded, currentPlayer, field, setCurrentPlayer, setField } =
		store();
	const handleClickField = (i) => {
		if (isGameEnded || field[i]) {
			return;
		}
		let newField = field.slice();
		newField[i] = currentPlayer;
		setField(newField);
		setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
	};
	return (
		<div className="tic-tac-toe__board">
			{field.map((cell, index) => {
				return (
					<button
						className="tic-tac-toe__btn"
						key={index}
						onClick={() => handleClickField(index)}
					>
						{cell}
					</button>
				);
			})}
		</div>
	);
}
