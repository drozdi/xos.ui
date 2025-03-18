import { XPagination } from "../../shared/ui";

export function PaginationExample() {
	return (
		<div className="max-w-4xl m-auto p-4 relative">
			<XPagination
				onChange={console.log}
				edges
				controls
				pages
				total={15}
			/>
		</div>
	);
}
