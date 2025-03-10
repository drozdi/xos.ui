import { useMemo, useState } from "react";
import appsManager from "../../entites/core/apps-manager";
import { Window } from "../../features";
import { useStateObject } from "../../shared/hooks";
import { Box } from "../../shared/internal/box";
import { XBtn } from "../../shared/ui";

const zeroDivisionError = "Can't divide with 0";
const matrix = [
	["C", "+-", "%", "/"],
	[7, 8, 9, "*"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="],
];

export function AppCalculator() {
	const [{ expr1, expr2, prev, sign }, updateOperand] = useStateObject({
		expr1: "0",
		expr2: "",
		sign: "",
		prev: "",
	});
	const [disabled, setDisabled] = useState([]);
	const disable = () => {
		setDisabled(["+-", "%", "/", "*", "+", "-", "."]);
	};
	const enable = () => {
		setDisabled([]);
	};

	const handleClickReset = (num = "0") => {
		updateOperand({ expr1: num, expr2: "", sign: "", prev: "" });
		enable();
	};
	const handleClickNum = (num) => {
		if (prev) {
			handleClickReset(num);
			return;
		}
		if (sign) {
			updateOperand({
				expr2: expr2 ? expr2 + num : String(num || ""),
			});
		} else {
			updateOperand({
				expr1: expr1 !== "0" ? expr1 + num : String(num || ""),
			});
		}
	};
	const handleClickEqual = () => {
		let num1 = +expr1;
		let num2 = +expr2;
		updateOperand({
			prev: `${expr1} ${sign} ${expr2}`,
		});
		switch (sign) {
			case "+":
				updateOperand({
					expr1: String(num1 + num2),
				});
				break;
			case "-":
				updateOperand({
					expr1: String(num1 - num2),
				});
				break;
			case "*":
				updateOperand({
					expr1: String(num1 * num2),
				});
				break;
			case "/":
				if (!num2) {
					updateOperand({
						expr2: zeroDivisionError,
						prev: "",
					});
					disable();
					break;
				}
				updateOperand({
					expr1: String(num1 / num2),
				});
				break;
		}
	};
	const handleClickSign = (sign) => {
		updateOperand({ sign, expr2: "", prev: "" });
	};
	const handleClickInvert = () => {
		if (prev || !sign) {
			updateOperand({
				expr1: +expr1 * -1,
			});
		} else if (sign) {
			updateOperand({
				expr2: +expr2 * -1,
			});
		}
	};

	const handleClickPercent = () => {
		if (sign === "") {
			handleClickReset();
			handleClickEqual();
			return;
		}
		if ("+-".split("").includes(sign)) {
			updateOperand({
				expr2: +expr1 * (+expr2 / 100),
			});
			handleClickEqual();
			updateOperand({
				prev: `${expr1} ${sign} ${expr2}%`,
			});
			return;
		}
		if ("*/".split("").includes(sign)) {
			updateOperand({
				expr2: +expr2 / 100,
			});
			return;
		}
	};
	const handleClickComa = () => {
		if (sign && !expr2.includes(".")) {
			updateOperand({
				expr2: expr2 ? expr2 + "." : "0.",
			});
		} else if (!expr1.includes(".")) {
			updateOperand({
				expr1: expr1 ? expr1 + "." : "0.",
			});
		}
	};

	const handleClickButton = (num) => {
		num === "C" || expr2 === zeroDivisionError
			? handleClickReset(num !== "C" ? num : "0")
			: num === "+-"
			? handleClickInvert()
			: num === "="
			? handleClickEqual()
			: num === "%"
			? handleClickPercent()
			: "+-*/".split("").includes(num)
			? handleClickSign(num)
			: num === "."
			? handleClickComa()
			: handleClickNum(num);
	};

	const title = useMemo(() => {
		if (!sign || prev) {
			return expr1;
		}
		return expr2;
	}, [expr1, expr2, sign, prev]);

	const subTitle = useMemo(() => {
		if (!sign) {
			return "";
		}
		if (prev) {
			return prev;
		}
		return `${expr1} ${sign}`;
	}, [expr1, prev, sign]);

	return (
		<Window title="Калькулятор" h={380} icons="reload collapse close">
			<Box col>
				<Box.Section className="items-end">
					<Box.Subtitle className="opacity-80">
						{"\u00A0"}
						{subTitle}
					</Box.Subtitle>
					<Box.Title className="text-3xl">
						{"\u00A0"}
						{title}
					</Box.Title>
				</Box.Section>
				{matrix.map((lines, index) => (
					<XBtn.Group grow pills key={index}>
						{lines.map((num, index) => (
							<XBtn
								key={index}
								className={
									num === "="
										? "w-[calc(50%+6*var(--spacing))]"
										: "w-1/4"
								}
								color={
									index === 3 || num === "="
										? "accent"
										: "info"
								}
								onClick={() => handleClickButton(`${num}`)}
								disabled={disabled.includes(num)}
							>
								{num}
							</XBtn>
						))}
					</XBtn.Group>
				))}
			</Box>
		</Window>
	);
}

AppCalculator.displayName = "./calculator/AppCalculator";

appsManager.append(
	{ displayName: "./calculator/AppCalculator" },
	{
		pathName: "calculator-app",
		wmGroup: "calculator-app",
		wmSort: 1,
	}
);
