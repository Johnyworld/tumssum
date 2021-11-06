import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Vec2 } from "types";

export interface grabbingData<T> {
	x: number;
	y: number;
	width: number;
	height: number;
	data: T;
}


export default <T>(data: T[]) => {

	const [ grabbing, setgrabbing ] = useState<grabbingData<T> | null>(null);
	const [ grabbingPos, setgrabbingPos ] = useState<null | Vec2>(null);
	const [ grapPos, setGrapPos ] = useState<null | Vec2>(null);

	const isDragging = grapPos && grabbingPos && grapPos.x !== grabbingPos.x && grapPos.y !== grabbingPos.y;

	const handleDragging = useCallback((e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => {
		if (grabbing) {
			const x = e.clientX - grabbing.x;
			const y = e.clientY - grabbing.y;
			setgrabbingPos({ x, y });
		}
	}, [grabbing]);
	
	const handleGrap = useCallback((data: T) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => {
		const grabbingItem = data;
		if ( grabbingItem ) {
			const rect = e.currentTarget.getBoundingClientRect();
			setGrapPos({
				x: e.clientX - e.clientX - rect.x,
				y: e.clientY - e.clientY - rect.y,
			})
			setgrabbing({
				x: e.clientX - rect.x,
				y: e.clientY - rect.y,
				width: rect.width,
				height: rect.height,
				data: grabbingItem
			});
		}
	}, [data])

	const handleDrop = useCallback(() => {
		setgrabbing(null);
		setgrabbingPos(null);
		setGrapPos(null);
	}, [])

	return { grabbing, grabbingPos, isDragging, handleGrap, handleDrop, handleDragging };
}
