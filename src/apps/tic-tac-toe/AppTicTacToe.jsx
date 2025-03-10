import appsManager from "../../entites/core/apps-manager";
import { Window } from "../../features";
import { Box } from "../../shared/internal/box";
import { XBtn } from "../../shared/ui";
import { Field, Information } from "./components";
import store from "./store";
import "./style.css";

const WIN_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
];

export function AppTicTacToe() {
	const { isGameEnded, field, restart, draw, endGame, setCurrentPlayer } =
		store();
	const checkWinner = () => {
		if (isGameEnded) {
			return;
		}
		let win = false;
		for (let combination of WIN_COMBINATIONS) {
			let [a, b, c] = combination;
			if (field[a] && field[a] === field[b] && field[b] === field[c]) {
				win = true;
				endGame();
				setCurrentPlayer(field[a]);
			}
		}
		if (!win && field.every((cell) => cell !== "")) {
			draw();
		}
	};

	checkWinner();
	//}, [field]);

	return (
		<Window title="Крестик Нолик">
			<Box col className="tic-tao-toe">
				<Box.Section side>
					<Information />
				</Box.Section>
				<Box.Section>
					<Field />
				</Box.Section>
				<Box.Section side>
					<XBtn
						disabled={!isGameEnded}
						leftSection="mdi-reload"
						color="info"
						onClick={() => restart()}
					>
						Начать заново
					</XBtn>
				</Box.Section>
			</Box>
		</Window>
	);
}

AppTicTacToe.displayName = "./tic-tac-toe/AppTicTacToe";

appsManager.append(
	{ displayName: "./tic-tac-toe/AppTicTacToe" },
	{
		pathName: "tic-tac-toe-app",
		wmGroup: "tic-tac-toe-app",
		wmSort: 1,
	}
);
