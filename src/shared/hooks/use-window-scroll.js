import { useEffect, useState } from "react";
import { useWindowEvent } from "./use-window-event";

function getScrollPosition() {
	return typeof window !== "undefined"
		? { x: window.pageXOffset, y: window.pageYOffset }
		: { x: 0, y: 0 };
}

function scrollTo({ x, y }) {
	if (typeof window !== "undefined") {
		const scrollOptions = { behavior: "smooth" };

		if (typeof x === "number") {
			scrollOptions.left = x;
		}

		if (typeof y === "number") {
			scrollOptions.top = y;
		}

		window.scrollTo(scrollOptions);
	}
}

export function useWindowScroll() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useWindowEvent("scroll", () => setPosition(getScrollPosition()));
	useWindowEvent("resize", () => setPosition(getScrollPosition()));

	useEffect(() => {
		setPosition(getScrollPosition());
	}, []);

	return [position, scrollTo];
}
