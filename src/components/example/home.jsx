import { Box } from "../internal/box";
import { Sections } from "../internal/sections";
import { XLink } from "../ui";
export function HomeExample() {
	return (
		<div className="p-8">
			<XLink
				className={(...args) => {
					console.log(args);
					return "tt";
				}}
				to="/list"
				label="yyyy"
				leftSection="mdi-home"
				rightSection="mdi-close"
			/>
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
			<Sections
				className="bg-bgmb4"
				leftSection="mdi-close"
				rightSection="mdi-close"
			>
				asdasd
			</Sections>
		</div>
	);
}
