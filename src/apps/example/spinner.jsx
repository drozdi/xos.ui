import {
	XItem,
	XItemLabel,
	XItemSection,
	XList,
	XSpinner,
	XSpinnerClock,
	XSpinnerComment,
	XSpinnerCube,
	XSpinnerGrid,
	XSpinnerHourglass,
	XSpinnerIos,
	XSpinnerOval,
	XSpinnerPie,
	XSpinnerRadio,
} from "../../shared/ui";
import { Form, useProps } from "./utils";
export function SpinnerExample() {
	const spinExample = useProps(
		{
			size: "1em",
			thickness: 5,
			color: "",
		},
		"XSpinner"
	);
	return (
		<div className="max-w-4xl m-auto flex flex-col gap-3">
			<XList dense>
				{[
					{
						elem: <XSpinnerPie size="48px" />,
						code: '<XSpinnerPie size="48px" />',
					},
					{
						elem: <XSpinnerIos color="primary" size={48} />,
						code: '<XSpinnerIos color="primary" size={48} />',
					},
					{
						elem: <XSpinnerCube color="secondary" size="3rem" />,
						code: '<XSpinnerCube color="secondary" size="3rem" />',
					},
					{
						elem: <XSpinnerGrid color="accent" size="3em" />,
						code: '<XSpinnerGrid color="accent" size="3em" />',
					},
					{
						elem: <XSpinnerOval color="positive" size="3em" />,
						code: '<XSpinnerOval color="positive" size="3em" />',
					},
					{
						elem: <XSpinnerRadio color="negative" size="3em" />,
						code: '<XSpinnerRadio color="negative" size="3em" />',
					},
					{
						elem: <XSpinnerClock color="info" size="3em" />,
						code: '<XSpinnerClock color="info" size="3em" />',
					},
					{
						elem: <XSpinnerComment color="warning" size="3em" />,
						code: '<XSpinnerComment color="warning" size="3em" />',
					},
					{
						elem: <XSpinnerHourglass size="3em" />,
						code: '<XSpinnerHourglass size="3em" />',
					},
				].map((v, i) => (
					<XItem key={i}>
						<XItemSection side>{v.elem}</XItemSection>
						<XItemSection className="bg-sky-500/50 text-white pl-3 rounded-md">
							<XItemLabel>{v.code}</XItemLabel>
						</XItemSection>
					</XItem>
				))}
			</XList>
			<h3>Generate</h3>
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<XSpinner {...spinExample.props} />
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{spinExample.code}
					</pre>
				</div>
				<div>
					{Form(
						{
							color: {
								type: "select",
								values: [
									"primary",
									"secondary",
									"accent",
									"positive",
									"negative",
									"info",
									"warning",
								],
							},
							size: { type: "text" },
							thickness: { type: "number" },
						},
						spinExample
					)}
				</div>
			</div>
		</div>
	);
}
