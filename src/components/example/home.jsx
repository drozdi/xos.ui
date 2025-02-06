import { Box } from "../internal/box";
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

			<Box className="bg-dark">
				<Box.Section className="bg-bgmb1">sdfsdf</Box.Section>
				<div className="bg-bgmb5">asdasd</div>
				<Box.Section className="bg-bgmb3">sdfsdf</Box.Section>
			</Box>
		</div>
	);
}
