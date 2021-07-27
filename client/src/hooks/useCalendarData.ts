import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Account, Vec2 } from "types";

export interface GrappingCalendarData extends Account {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface UseCalendar {
	date: string;
	data: Account[];
	onUpdate: (i: number, data: Account) => void;
}


export default ({ data, onUpdate }: UseCalendar) => {

	const [ grapping, setGrapping ] = useState<GrappingCalendarData | null>(null);
	const [ grappingPos, setGrappingPos ] = useState<Vec2>({ x: 0, y: 0 });

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

	const handleDrop = useCallback((date: string) => () => {
		if (grapping) {
			const grepedIndex = data.findIndex(item => item.id === grapping.id);
			const newDatetime = date + 'T' + grapping.datetime.split('T')[1]
			onUpdate(grepedIndex, { datetime: newDatetime } as Account);
		}
		setGrapping(null);
	}, [data, grapping])

	return { grapping, grappingPos, handleGrap, handleDrop, handleDragging };
}
