import { XLink } from '../ui';
export function HomeExample() {
	return (
		<div className="p-8">
			<XLink
				className={(...args) => {
					console.log(args);
					return 'tt';
				}}
				to="/"
				label="yyyy"
				leftSection="mdi-home"
				rightSection="mdi-close"
			/>
		</div>
	);
}
