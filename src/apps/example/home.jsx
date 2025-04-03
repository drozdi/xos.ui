import { Box } from "../../shared/internal/box";
import { Sections } from "../../shared/internal/sections";
import { XIcon } from "../../shared/ui";
import { Form, useProps } from "./utils";

export function HomeExample() {
	const boxExample = useProps(
		{
			col: false,
			noWrap: false,
			size: "",
			align: "",
			justify: "",
		},
		"Box",
		`<Box.Section side>
		<XIcon>mdi-home</XIcon>
	</Box.Section>
	<Box.Section side className="bg-bgmb5">
		asdasd
	</Box.Section>
	<Box.Section side className="bg-bgmb3">
		sdfsdf
	</Box.Section>
	<Box.Section side>
		<XIcon>mdi-close</XIcon>
	</Box.Section>
`
	);

	return (
		<div className="max-w-4xl m-auto flex flex-col gap-3">
			<div className="grid grid-cols-2 *:col-span-1 *:p-3 *:border *:border-color">
				<div>
					<Box
						{...boxExample.props}
						className="bg-dark"
						style={{ height: 200 }}
					>
						<Box.Section side>
							<XIcon>mdi-home</XIcon>
						</Box.Section>
						<Box.Section className="bg-bgmb5">asdasd</Box.Section>
						<Box.Section className="bg-bgmb3">sdfsdf</Box.Section>
						<Box.Section side>
							<XIcon>mdi-close</XIcon>
						</Box.Section>
					</Box>
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{boxExample.code}
					</pre>
				</div>
				<div>
					{Form(
						{
							col: { type: "checkbox" },
							noWrap: { type: "checkbox" },
							size: {
								type: "select",
								values: ["xs", "sm", "lg"],
							},
							align: {
								type: "select",
								values: [
									"start",
									"center",
									"end",
									"stretch",
									"baseline",
								],
							},
							justify: {
								type: "select",
								values: [
									"start",
									"center",
									"end",
									"between",
									"around",
									"evenly",
									"normal",
									"baseline",
									"stretch",
								],
							},
						},
						boxExample
					)}
				</div>
			</div>

			<div className="p-8">
				<hr className="my-4" />
				<Box className="bg-dark">
					<Box.Section side className="bg-bgmb1">
						sdfsdf
					</Box.Section>
					<Box.Section className="bg-bgmb5">asdasd</Box.Section>
					<Box.Section side className="bg-bgmb3">
						sdfsdf
					</Box.Section>
				</Box>
				<hr className="my-4" />
				<Sections className="bg-bgmb4">asdasd</Sections>
			</div>
		</div>
	);
}
