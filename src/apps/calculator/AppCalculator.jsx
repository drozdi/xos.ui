import { useMemo } from "react";
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
	const [{ expr1, expr2, sign }, updateOperand] = useStateObject({
		expr1: "0",
		expr2: "",
		sign: "",
	});

	const handleClickReset = () => {
		updateOperand({ expr1: "0", expr2: "", sign: "" });
	};
	const handleClickNum = (num) => {
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
	const handleClickEqual = () => {};
	const handleClickSign = (sign) => {
		updateOperand({ sign });
	};
	const handlerClickInvert = () => {
		/*setCalc({
			num: num ? toLocaleString(removeSpaces(num) * -1) : 0,
			res: res ? toLocaleString(removeSpaces(res) * -1) : 0,
			sign: "",
		});*/
	};

	const handleClickButton = (num) => {
		num === "C" || expr2 === zeroDivisionError
			? handleClickReset()
			: num === "+-"
			? handlerClickInvert()
			: "+-*/".split("").includes(num)
			? handleClickSign(num)
			: handleClickNum(num);
	};
	/*
	const onNumClick = (num) => {
		if (operator) {
			setOperand2(operand2 ? operand2 + num : String(num || ""));
		} else {
			setOperand1(operand1 ? operand1 + num : String(num || ""));
		}
	};
	const onOperatorClick = (operator) => {
		if (operator === "=") {
			resultClick();
		} else if (operator === "C") {
			clearClick();
		} else if (operand2) {
			resultClick();
			setOperator(operator);
			setIsResult(false);
		} else {
			setOperator(operator);
			setIsResult(false);
		}
	};
	const clearClick = () => {
		setOperator("");
		setOperand1("");
		setOperand2("");
		setIsResult(false);
	};
	const resultClick = () => {
		let num1 = +operand1;
		let num2 = +operand2;
		setOperand1("");
		setOperand2("");
		switch (operator) {
			case "+":
				setOperand1(num1 + num2);
				setOperator("");
				break;
			case "-":
				setOperand1(num1 - num2);
				setOperator("");
				break;
		}
		setIsResult(true);
	};
*/
	const title = useMemo(() => {
		if (!sign) {
			return expr1;
		}
		return expr2;
	}, [expr1, expr2, sign]);

	const subTitle = useMemo(() => {
		if (!sign) {
			return "";
		}
		return `${expr1} ${sign}`;
	}, [expr1, sign]);

	return (
		<Window title="Калькулятор">
			<div className="calculator">
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
									onClick={() => handleClickButton(num)}
								>
									{num}
								</XBtn>
							))}
						</XBtn.Group>
					))}
				</Box>
			</div>
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
