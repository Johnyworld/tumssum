import { h } from 'preact';
import { useCallback, useRef, useState } from 'preact/hooks';
import { SIDE_WIDTH_DEFAULT, SIDE_WIDTH_MAX, SIDE_WIDTH_MIN } from '~utils/constants';



export default () => {

	const borderRef = useRef<HTMLDivElement>(null);
	
	const init = localStorage.getItem('home_side') || SIDE_WIDTH_DEFAULT;
	const [ sideWidth, setSideWidth ] = useState<number>(+init);
	const [ tempWidth, setTempWidth ] = useState<number>(0);
	const [ grabPos, setGrabPos ] = useState<number | null>(null);

	const handleBorderMouseDown: h.JSX.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
		setGrabPos(e.clientX);
		setTempWidth(sideWidth);
	}, [sideWidth]);

	const handleContainerMouseUp: h.JSX.MouseEventHandler<HTMLDivElement | HTMLElement> = useCallback((e) => {
		localStorage.setItem('home_side', sideWidth+'');
		setGrabPos(null);
	}, [sideWidth]);

	const handleContainerDrag: h.JSX.MouseEventHandler<HTMLElement> = useCallback((e) => {
		if (grabPos) {
			const movePos = (grabPos - e.clientX);
			const newWidth = tempWidth + movePos;
			setSideWidth(newWidth > SIDE_WIDTH_MAX ? SIDE_WIDTH_MAX : newWidth < SIDE_WIDTH_MIN ? SIDE_WIDTH_MIN : newWidth);
		}
	}, []);

	return {
		borderRef,
		sideWidth,
		handleBorderMouseDown,
		handleContainerMouseUp,
		handleContainerDrag,
	};
}