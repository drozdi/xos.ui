import appsManager from "../../entites/core/apps-manager";
import { Window } from "../../features";
import { Box } from "../../shared/internal/box";
import { XBtn } from "../../shared/ui";

export function AppCalculator() {
	return (
		<Window title="Калькулятор">
			<div className="calculator">
				<div className="display-screen">
					<div className="calculation-item">0</div>
				</div>
				<Box col>
					<XBtn.Group grow pills color="info">
						<XBtn className="w-1/4">C</XBtn>
						<XBtn className="w-1/4">A</XBtn>
						<XBtn className="w-1/4">+/−</XBtn>
						<XBtn className="w-1/4" color="accent">
							÷
						</XBtn>
					</XBtn.Group>
					<XBtn.Group grow pills color="info" className="row">
						<XBtn className="w-1/4">7</XBtn>
						<XBtn className="w-1/4">8</XBtn>
						<XBtn className="w-1/4">9</XBtn>
						<XBtn className="w-1/4" color="accent">
							×
						</XBtn>
					</XBtn.Group>
					<XBtn.Group grow pills color="info" className="row">
						<XBtn className="w-1/4">4</XBtn>
						<XBtn className="w-1/4">5</XBtn>
						<XBtn className="w-1/4">6</XBtn>
						<XBtn className="w-1/4" color="accent">
							−
						</XBtn>
					</XBtn.Group>
					<XBtn.Group grow pills color="info" className="row">
						<XBtn className="w-1/4">1</XBtn>
						<XBtn className="w-1/4">2</XBtn>
						<XBtn className="w-1/4">3</XBtn>
						<XBtn className="w-1/4" color="accent">
							+
						</XBtn>
					</XBtn.Group>
					<XBtn.Group grow pills color="info" className="row">
						<XBtn className="w-1/2">0</XBtn>
						<XBtn className="w-1/4">.</XBtn>
						<XBtn className="w-1/4" color="accent">
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
