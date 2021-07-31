import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Vec2 } from "types";

export interface GrappingData<T> {
	x: number;
	y: number;
	width: number;
	height: number;
	data: T;
}


export default <T>(data: T[]) => {

	const [ grapping, setGrapping ] = useState<GrappingData<T> | null>(null);
	const [ grappingPos, setGrappingPos ] = useState<null | Vec2>(null);
	const [ grapPos, setGrapPos ] = useState<null | Vec2>(null);

	const isDragging = grapPos && grappingPos && grapPos.x !== grappingPos.x && grapPos.y !== grappingPos.y;

	const handleDragging = useCallback((e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => {
		if (grapping) {
			const x = e.clientX - grapping.x;
			const y = e.clientY - grapping.y;
			setGrappingPos({ x, y });
		}
	}, [grapping]);
	
	const handleGrap = useCallback((data: T) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => {
		const grappingItem = data;
		if ( grappingItem ) {
			const rect = e.currentTarget.getBoundingClientRect();
			setGrapPos({
				x: e.clientX - e.clientX - rect.x,
				y: e.clientY - e.clientY - rect.y,
			})
			setGrapping({
				x: e.clientX - rect.x,
				y: e.clientY - rect.y,
				width: rect.width,
				height: rect.height,
				data: grappingItem
			});
		}
	}, [data])

	const handleDrop = useCallback(() => {
		setGrapping(null);
		setGrappingPos(null);
		setGrapPos(null);
	}, [])

	return { grapping, grappingPos, isDragging, handleGrap, handleDrop, handleDragging };
}
