import { useState } from "react";
import { debounce } from "../utils/debounce";

export function useForceUpdate({ debounceTime = 100 } = {}) {
	const [, setToggle] = useState(false);
	return () => debounce(() => setToggle((toggle) => !toggle), debounceTime);
}
