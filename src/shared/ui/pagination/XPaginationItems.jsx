import { DOTS } from "../../hooks";
import "./style.css";
import { XPaginationBtn } from "./XPaginationBtn";
import { useXPaginationContext } from "./XPaginationContext";
import { XPaginationDots } from "./XPaginationDots";

export const XPaginationItems = () => {
	const ctx = useXPaginationContext();
	return (
		<>
			{ctx.range.map((page, index) => {
				if (page === DOTS) {
					return <XPaginationDots key={index} />;
				}
				return (
					<XPaginationBtn
						key={index}
						active={page === ctx.current}
						aria-current={page === ctx.current ? "page" : undefined}
						onClick={() => ctx.onChange(page)}
						disabled={ctx.disabled}
					>
						{page}
					</XPaginationBtn>
				);
			})}
		</>
	);
};

XPaginationItems.displayName = "ui/XPaginationItems";
XPaginationItems.propTypes = {};
