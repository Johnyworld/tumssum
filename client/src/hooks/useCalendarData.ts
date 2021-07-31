import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Account, Vec2 } from "types";

export interface GrappingCalendarData extends Account {
	x: number;
	y: number;
	width: number;
	height: number;
}


export default (data: Account[]) => {

	const [ grapping, setGrapping ] = useState<GrappingCalendarData | null>(null);
	const [ grappingPos, setGrappingPos ] = useState<null | Vec2>(null);

	const handleDragging = useCallback((e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => {
		if (grapping) {
			const x = e.clientX - grapping.x;
			const y = e.clientY - grapping.y;
			setGrappingPos({ x, y });
		}
	}, [grapping]);
	
	const handleGrap = useCallback((id: number) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => {
		const grappingItem = data.find(item => item.id === id);
		if ( grappingItem ) {
			const rect = e.currentTarget.getBoundingClientRect();
			setGrapping({
				x: e.clientX - rect.x,
				y: e.clientY - rect.y,
				width: rect.width,
				height: rect.height,
				...grappingItem
			});
		}
	}, [data])

	const handleDrop = useCallback(() => {
		setGrapping(null);
	}, [])

	return { grapping, grappingPos, handleGrap, handleDrop, handleDragging };
}
