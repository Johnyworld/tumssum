import { Account } from "types";
import numberUtils from "./numberUtils";

const { getZeroNumber } = numberUtils;

export interface DayItem { 
	each: number,
	date: string,
	isThisMonth?: boolean,	
	isToday?: boolean,
	data?: Account[];
}


export const getMonthDate = (date: string, sum: number) => {
	const then = new Date(date);
	then.setMonth(then.getMonth() + sum);
	return getLocalString(then);
}

const englishMonthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getMonthString = (lang: string, month?: number) => {
	if (month === undefined) return month;
	if (lang === 'ko') return (month+1 < 10 ? '0' : '') + (month+1);
	return englishMonthes[month];
}

export const getDateString = (lang: string, { year, month, date }: { year?: number, month?: number, date?: number }) => {
	const M = getMonthString(lang, month);
	const arr = [date && getZeroNumber(date), M, year].filter(item=> !!item);
	if (lang === 'ko') return arr.reverse().join('. ');
	return arr.join(' ');
}


export const getDatetimeString = (lang: string, datetime: string) => {
	const split = datetime.split('T');
	const dates = split[0].split('-');
	const time = split[1];
	const year = +dates[0];
	const month = +dates[1] - 1;
	const date = +dates[2];
	return getDateString(lang, { year, month, date }) + (time ? '. ' + split[1].substr(0, 5) : '');
}


export const getDateStringByDateType = (lang: string, then: Date) => {
	const year = then.getFullYear();
	const month = then.getMonth();
	const date = then.getDate();
	return getDateString(lang, { year, month, date });
}


export const getTimeString = () => {
		
}




export const getLocalString = (date?: Date) => {
	const then = date ? date : new Date();
	const M = then.getMonth() + 1;
	const h = then.getHours();
	const m = then.getMinutes();
	const s = then.getSeconds();
	return `${then.getFullYear()}-${getZeroNumber(M)}-${getZeroNumber(then.getDate())}T${getZeroNumber(h)}:${getZeroNumber(m)}:${getZeroNumber(s)}`;
}

export const getLocalStringFromISOString = (isoString: string) => {
	const isTime = isoString.length > 10;	
	const then = new Date(isoString);
	const localDate = getLocalString(then);
	return isTime ? localDate : localDate.substr(0, 10);
}

export const getLimit = (num: number, limit: number) => {
	if (num < 0) return limit + num & limit;
	else if (num > limit - 1) return num % limit;
	else return num;
}

export const getHoursLimit = (h: number) => {
	return getLimit(h, 24);
}

export const getMinutesLimit = (m: number) => {
	return getLimit(m, 60);
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

export const combineCalendarWithData = (calendar: DayItem[][], data?: Account[]) => {
	if (!data) return calendar;
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

	// ????????? ?????? 2?????? 29???
	if (isLeap(YEAR)) basicyear[1]++;

	// 0????????? ??????????????? ?????? ??????
	for ( let i=1; i<YEAR; i++ ) {
		if (isLeap(i)) sum += 366;
		else sum += 365;
	}

	// ?????? ???????????? ?????? ??????
	for ( let i=0; i<MONTH; i++ ) {
		sum += basicyear[i];
	}

	// 1?????? ??????
	k = sum % 7;

	// ?????????, ????????? ??? ??????
	const daysCountThisAndLastMonth = k + basicyear[MONTH];

	// ????????? ????????? weeks ??????
	const weeksCount = Math.floor((daysCountThisAndLastMonth-1) / 7) + 1;

	// ????????? ????????? ????????? ???????????? ?????????
	const nextMonthDaysCount = weeksCount*7 - daysCountThisAndLastMonth;

	// ?????? ??? ?????? ?????????
	for ( let j=0; j<k; j++) {
		const day = basicyear[ MONTH -1 < 0 ? 11 : MONTH-1 ] - k + j + 1;
		const prevDate = new Date(YEAR, MONTH - 1);
		const prevYear = prevDate.getFullYear();
		const prevMonth = prevDate.getMonth();
		const YMD = `${prevYear}-${prevMonth<9?`0${prevMonth+1}`:prevMonth+1}-${day<10?`0${day}`:day}`;
		calendar[0].push({
			each: onlyThisMonth ? 0 : day,
			date: YMD,
		});
	}

	for ( let i=1; i<=basicyear[MONTH]+nextMonthDaysCount; i++) {
		const thisWeek = calendar[week];

		if ( i > basicyear[MONTH] ) {
			// ????????? ?????? ??????
			const nextDate = new Date(YEAR, MONTH + 1);
			const nextYear = nextDate.getFullYear();
			const nextMonth = nextDate.getMonth();
			const day = i-basicyear[MONTH]
			const YMD = `${nextYear}-${nextMonth<9?`0${nextMonth+1}`:nextMonth+1}-${day<10?`0${day}`:day}`;
			thisWeek.push({
				each: onlyThisMonth ? 0 : day,
				date: YMD,
			})

		} else {
			// ????????? ??????
			const YMD = `${YEAR}-${MONTH+1>9?MONTH+1:`0${MONTH+1}`}-${i>9?i:`0${i}`}`
			thisWeek.push({
				each: i,
				date: YMD,
				isThisMonth: true,
				isToday: getLocalString().substr(0, 10) === YMD,
			});
		}

		// 6??? ?????? ??????
		if ( k === 6 ) {
			k = -1;
			week++;
			calendar = [ ...calendar, [] ]
		}
		k++;
	}

	return calendar;
}
