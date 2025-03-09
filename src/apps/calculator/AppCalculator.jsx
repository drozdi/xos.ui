import { useState } from "react";
import appsManager from "../../entites/core/apps-manager";
import { Window } from "../../features";
import { Box } from "../../shared/internal/box";
import { XBtn } from "../../shared/ui";

export function AppCalculator() {
	const [operator, setOperator] = useState("");
	const [operand1, setOperand1] = useState("");
	const [operand2, setOperand2] = useState("");
	const [isResult, setIsResult] = useState(false);

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

	return (
		<Window title="Калькулятор">
			<div className="calculator">
				<Box justify="end">
					<Box.Header className="text-3xl text-right">0</Box.Header>
				</Box>
				<Box col>
					<XBtn.Group grow pills color="info">
						<XBtn
							className="w-1/4"
							onClick={() => onOperatorClick("C")}
						>
							C
						</XBtn>
						<XBtn
							className="w-1/4"
							onClick={() => onOperatorClick("I")}
						>
							+−
						</XBtn>
						<XBtn
							className="w-1/4"
							onClick={() => onOperatorClick("%")}
						>
							%
						</XBtn>
						<XBtn
							className="w-1/4"
							onClick={() => onOperatorClick("+")}
							color="accent"
						>
							÷
						</XBtn>
					</XBtn.Group>
					<XBtn.Group grow pills color="info">
						<XBtn className="w-1/4" onClick={() => onNumClick(7)}>
							7
						</XBtn>
						<XBtn className="w-1/4" onClick={() => onNumClick(8)}>
							8
						</XBtn>
						<XBtn className="w-1/4" onClick={() => onNumClick(9)}>
							9
						</XBtn>
						<XBtn
							className="w-1/4"
							onClick={() => onOperatorClick("*")}
							color="accent"
						>
							×
						</XBtn>
					</XBtn.Group>
					<XBtn.Group grow pills color="info">
						<XBtn className="w-1/4" onClick={() => onNumClick(4)}>
							4
						</XBtn>
						<XBtn className="w-1/4" onClick={() => onNumClick(5)}>
							5
						</XBtn>
						<XBtn className="w-1/4" onClick={() => onNumClick(6)}>
							6
						</XBtn>
						<XBtn
							className="w-1/4"
							onClick={() => onOperatorClick("-")}
							color="accent"
						>
							−
						</XBtn>
					</XBtn.Group>
					<XBtn.Group grow pills color="info">
						<XBtn className="w-1/4" onClick={() => onNumClick(1)}>
							1
						</XBtn>
						<XBtn className="w-1/4" onClick={() => onNumClick(2)}>
							2
						</XBtn>
						<XBtn className="w-1/4" onClick={() => onNumClick(3)}>
							3
						</XBtn>
						<XBtn
							className="w-1/4"
							onClick={() => onOperatorClick("+")}
							color="accent"
						>
							+
						</XBtn>
					</XBtn.Group>
					<XBtn.Group grow pills color="info">
						<XBtn className="w-1/4" onClick={() => onNumClick(0)}>
							0
						</XBtn>
						<XBtn
							className="w-1/4"
							onClick={() => onOperatorClick(".")}
						>
							.
						</XBtn>
						<XBtn
							className="w-[calc(50%+6*var(--spacing))]"
							onClick={() => onOperatorClick("=")}
							color="accent"
						>
							=
						</XBtn>
					</XBtn.Group>
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
