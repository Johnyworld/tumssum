import { useState } from "preact/hooks";

export interface CalendarData {
	/** YYYY-MM-DD */
	id: string;
	date: string;
	data: string;
}

interface DayItem { 
	each: number,
	date: string,
	isThisMonth: boolean,	
	data?: CalendarData[];
}

interface UseCalendar {
	data: CalendarData[];
	onUpdate: (i: number, data: CalendarData) => void;
}

const basicyear = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

const isLeap = ( year: number ) => {
	if ((( year % 4 === 0 ) && !( year % 100 === 0 )) || ( year % 400 === 0 )) return 1;
	else return 0;
}

const getDataAligned = (data: CalendarData[]) => {
	const results: {[x:string]: CalendarData[]} = {}
	for ( const item of data ) {
		if (!results[item.date]) results[item.date] = [];
		results[item.date].push(item);
	}
	return results;
}

export const getCalendar = ( year: number, month: number, data: CalendarData[] ) => {

	const alignedData = getDataAligned(data);

	const YEAR = year;
	const MONTH = month;
	let calendar: DayItem[][] = [[]];
	let sum = 365;
	let week = 0;
	let k;

	// 윤년의 경우 2월이 29일
	if (isLeap(YEAR)) basicyear[1]++;

	// 0년부터 작년까지의 날짜 총합
	for ( let i=1; i<YEAR; i++ ) {
		if (isLeap(i)) sum += 366;
		else sum += 365;
	}

	// 지난 달까지의 날짜 총합
	for ( let i=0; i<MONTH; i++ ) {
		sum += basicyear[i];
	}

	// 1일의 요일
	k = sum % 7;
	// const result = Math.floor(YEAR*365 + Math.floor(YEAR/4) - Math.floor(YEAR/100) + Math.floor(YEAR/400));

	// 이전 달 날짜 채우기
	for ( let j=0; j<k; j++) {
		const day = basicyear[ MONTH -1 < 0 ? 11 : MONTH-1 ] - k + j + 1;
		const prevDate = new Date(YEAR, MONTH - 1);
		const prevYear = prevDate.getFullYear();
		const prevMonth = prevDate.getMonth();
		const YMD = `${prevYear}-${prevMonth<9?`0${prevMonth+1}`:prevMonth+1}-${day<10?`0${day}`:day}`;
		calendar[0].push({
			each: day,
			date: YMD,
			isThisMonth: false,
		});
	}
	
	const untilNextMonth = 35 - basicyear[MONTH] - k;

	for ( let i=1; i<=basicyear[MONTH]+untilNextMonth; i++) {
		const thisWeek = calendar[week];

		if ( i > basicyear[MONTH] ) {
			// 다음달 날짜 표기
			const nextDate = new Date(YEAR, MONTH + 1);
			const nextYear = nextDate.getFullYear();
			const nextMonth = nextDate.getMonth();
			const day = i-basicyear[MONTH]
			const YMD = `${nextYear}-${nextMonth<9?`0${nextMonth+1}`:nextMonth+1}-${day<10?`0${day}`:day}`;
			thisWeek.push({
				each: day,
				date: YMD,
				isThisMonth: false,
			})

		} else {
			// 이번달 날짜
			const YMD = `${YEAR}-${MONTH+1>9?MONTH+1:`0${MONTH+1}`}-${i>9?i:`0${i}`}`
			const dayItem: DayItem = {
				each: i,
				date: YMD,
				isThisMonth: true,
			}
			if ( alignedData[YMD] ) dayItem.data = alignedData[YMD];
			thisWeek.push(dayItem);
		}

		// 6일 기준 루핑
		if ( k === 6 ) {
			k = -1;
			week++;
			calendar = [ ...calendar, [] ]
		}
		k++;
	}

	return calendar
}

export default ({ data, onUpdate }: UseCalendar) => {

	const [ greped, setGreped ] = useState('');
	const calendar = getCalendar(2021, 6, data);
	console.log('===== useCalendar', calendar);
	
	const handleGrep = (id: string) => () => {
		console.log('===== Grep', id);
		setGreped(id);
	}

	const handleDrop = (date: string) => () => {
		console.log('===== Drop', date);
		if (greped) {
			const grepedIndex = data.findIndex(item => item.id === greped);
			onUpdate(grepedIndex, { date } as CalendarData);
		}
		setGreped('');
	}

	return { calendar, handleGrep, handleDrop };
}