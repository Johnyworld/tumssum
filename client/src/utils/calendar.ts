import { Account } from "types";

export interface DayItem { 
	each: number,
	date: string,
	isThisMonth: boolean,	
	data?: Account[];
}


export const getMonthDate = (date: string, sum: number) => {
	const then = new Date(date);
	then.setMonth(then.getMonth() + sum);
	return then.toISOString();
}

const englishMonthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getMonthString = (lang: string, month?: number) => {
	if (month === undefined) return month;
	if (lang === 'ko') return (month+1 < 10 ? '0' : '') + (month+1);
	return englishMonthes[month];
}

export const getDateString = (lang: string, { year, month, date }: { year?: number, month?: number, date?: number }) => {
	const M = getMonthString(lang, month);
	const arr = [date, M, year].filter(item=> !!item);
	if (lang === 'ko') return arr.reverse().join('. ');
	return arr.join(' ');
}


export const getLocalString = () => {
	const then = new Date();
	const M = then.getMonth() + 1;
	return `${then.getFullYear()}-${M<10?'0'+M:M}-${then.getDate()}`;
}


const isLeap = ( year: number ) => {
	if ((( year % 4 === 0 ) && !( year % 100 === 0 )) || ( year % 400 === 0 )) return 1;
	else return 0;
}

const getDataAligned = (data: Account[]) => {
	const results: {[x:string]: Account[]} = {}
	for ( const item of data ) {
		const date = item.datetime.split('T')[0];
		if (!results[date]) results[date] = [];
		results[date].push(item);
	}
	return results;
}

export const combineCalendarWithData = (calendar: DayItem[][], data: Account[]) => {
	const alignedData = getDataAligned(data);
	for (const row of calendar) {
		for (const col of row) {
			if ( alignedData[col.date] ) {
				col.data = alignedData[col.date];
			}
		}
	}
	return calendar;
}

export const getCalendar = ( year: number, month: number, onlyThisMonth?: boolean ) => {

	const basicyear = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
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

	// 이번달, 이전달 총 몇일
	const daysCountThisAndLastMonth = k + basicyear[MONTH];

	// 달력에 보여질 weeks 개수
	const weeksCount = Math.floor((daysCountThisAndLastMonth-1) / 7) + 1;

	// 다음달 날짜를 몇개를 보여줘야 하는지
	const nextMonthDaysCount = weeksCount*7 - daysCountThisAndLastMonth;

	// 이전 달 날짜 채우기
	for ( let j=0; j<k; j++) {
		const day = basicyear[ MONTH -1 < 0 ? 11 : MONTH-1 ] - k + j + 1;
		const prevDate = new Date(YEAR, MONTH - 1);
		const prevYear = prevDate.getFullYear();
		const prevMonth = prevDate.getMonth();
		const YMD = `${prevYear}-${prevMonth<9?`0${prevMonth+1}`:prevMonth+1}-${day<10?`0${day}`:day}`;
		calendar[0].push({
			each: onlyThisMonth ? 0 : day,
			date: YMD,
			isThisMonth: false,
		});
	}

	for ( let i=1; i<=basicyear[MONTH]+nextMonthDaysCount; i++) {
		const thisWeek = calendar[week];

		if ( i > basicyear[MONTH] ) {
			// 다음달 날짜 표기
			const nextDate = new Date(YEAR, MONTH + 1);
			const nextYear = nextDate.getFullYear();
			const nextMonth = nextDate.getMonth();
			const day = i-basicyear[MONTH]
			const YMD = `${nextYear}-${nextMonth<9?`0${nextMonth+1}`:nextMonth+1}-${day<10?`0${day}`:day}`;
			thisWeek.push({
				each: onlyThisMonth ? 0 : day,
				date: YMD,
				isThisMonth: false,
			})

		} else {
			// 이번달 날짜
			const YMD = `${YEAR}-${MONTH+1>9?MONTH+1:`0${MONTH+1}`}-${i>9?i:`0${i}`}`
			thisWeek.push({
				each: i,
				date: YMD,
				isThisMonth: true,
			});
		}

		// 6일 기준 루핑
		if ( k === 6 ) {
			k = -1;
			week++;
			calendar = [ ...calendar, [] ]
		}
		k++;
	}

	return calendar;
}
