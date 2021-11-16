import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Vec2 } from "types";

interface UseMiniPopup {
	height: number;	
}

export default ({ height }: UseMiniPopup) => {

	const [pos, setPos] = useState<Vec2 | null>(null);

	const handleShowPicker: h.JSX.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
		if (pos) setPos(null);
		else {
			const rect = e.currentTarget.getBoundingClientRect();
			let x = rect.x;
			let y = rect.y + rect.height - 1;
			if ( y + height > window.innerHeight && y > height ) {
				y = y - height - rect.height + 2;
			}
			setPos({ x, y });
		}
	}, [pos]);

	const handleClosePicker = useCallback(() => {
		setPos(null);
	}, []);
	
	return {
		pos,
		handleShowPicker,
		handleClosePicker,
	};
}