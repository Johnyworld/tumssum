import { Account, DayItem } from 'types';
import accountUtil from '../accountUtil';
import CustomDate from '../CustomDate';
import dateUtil from '../dateUtil';
import numberUtil from '../numberUtil';

export default class CalendarBase {
  private calendar: DayItem[][];
  private accounts: { [x: string]: Account[] } | null;
  private days: number[];
  private year: number;
  private month: number;
  private dayOfOne: number; // 이번달 1일의 요일
  private sum: number; // 0년부터 작년까지의 날짜 총합
  private now: CustomDate;

  constructor(yyyymm?: string, accounts?: Account[]) {
    this.now = new CustomDate();
    const [yyyy, mm] = yyyymm ? yyyymm.split('-') : this.now.getLocalYearMonth().split('-');
    this.calendar = [[]];
    this.accounts = accounts ? accountUtil.getDataAligned(accounts) : null;
    this.days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.year = +yyyy;
    this.month = +mm - 1;
    this.dayOfOne = 0;
    this.sum = 365;
    this.initialize();
  }

  getCalendar() {
    return this.calendar;
  }

  private initialize() {
    this.setFebDays();
    this.setSum();
    this.setDayOfOne();
    this.setCalendarPrevMonth();
    this.setCalendarThisAndNextMonth();
  }

  private setFebDays() {
    if (dateUtil.getIsLeap(this.year)) this.days[1]++;
  }

  private setSum() {
    this.setSumLastYear();
    this.setSumLastMonth();
  }

  private setSumLastYear() {
    for (let i = 1; i < this.year; i++) {
      if (dateUtil.getIsLeap(i)) this.sum += 366;
      else this.sum += 365;
    }
  }

  private setSumLastMonth() {
    for (let i = 0; i < this.month; i++) {
      this.sum += this.days[i];
    }
  }

  private setDayOfOne() {
    this.dayOfOne = this.sum % 7;
  }

  private setCalendarPrevMonth() {
    for (let i = 0; i < this.dayOfOne; i++) {
      this.calendar[0].push(this.getDayItemOfPrevMonth(i));
    }
  }

  private setCalendarThisAndNextMonth() {
    for (let i = 1; i <= this.days[this.month] + this.getNextMonthDaysCount(); i++) {
      this.putDayItemToCalendarEachDate(i);
    }
  }

  private getNextMonthDaysCount() {
    const daysCountThisAndLastMonth = this.dayOfOne + this.days[this.month];
    const weeksCount = Math.floor((daysCountThisAndLastMonth - 1) / 7) + 1;
    return weeksCount * 7 - daysCountThisAndLastMonth;
  }

  private putDayItemToCalendarEachDate(date: number) {
    const thisWeek = this.getWeek(date);
    if (!this.calendar[thisWeek]) this.calendar[thisWeek] = [];
    this.calendar[thisWeek].push(this.getDayItemOfEachDate(date));
  }

  private getWeek(date: number) {
    return Math.floor((this.dayOfOne + date - 1) / 7);
  }

  private getDayItemOfEachDate(date: number): DayItem {
    if (date > this.days[this.month]) return this.getDayItemOfNextMonth(date);
    else return this.getDayItemOfThisMonth(date);
  }

  private getDayItemOfPrevMonth(index: number): DayItem {
    const yyyymmdd = this.getPrevMonthYyyymmdd(index);
    return { yyyymmdd, accounts: this.getAccounts(yyyymmdd) };
  }

  private getDayItemOfNextMonth(date: number): DayItem {
    const yyyymmdd = this.getNextMonthYyyymmdd(date - this.days[this.month]);
    return { yyyymmdd, accounts: this.getAccounts(yyyymmdd) };
  }

  private getDayItemOfThisMonth(date: number): DayItem {
    const yyyymmdd = this.getThisMonthYyyymmdd(date);
    return {
      yyyymmdd,
      isThisMonth: true,
      isToday: this.now.getLocalDate() === yyyymmdd,
      accounts: this.getAccounts(yyyymmdd),
    };
  }

  private getAccounts(yyyymmdd: string): Account[] | undefined {
    if (this.accounts && this.accounts[yyyymmdd]) return this.accounts[yyyymmdd];
    return undefined;
  }

  private getThisMonthYyyymmdd(date: number): string {
    return `${this.year}-${numberUtil.getZeroNumber(this.month + 1)}-${numberUtil.getZeroNumber(date)}`;
  }

  private getPrevMonthYyyymmdd(index: number) {
    const prevMonthDate = new Date(this.year, this.month - 1);
    const prevYear = prevMonthDate.getFullYear();
    const prevMonth = prevMonthDate.getMonth();
    const date = this.days[prevMonth] - this.dayOfOne + (index + 1); // 31 - 2(Wed) + (1 | 2) = (30 | 31)
    return `${prevYear}-${numberUtil.getZeroNumber(prevMonth + 1)}-${numberUtil.getZeroNumber(date)}`;
  }

  private getNextMonthYyyymmdd(date: number) {
    const nextDate = new Date(this.year, this.month + 1);
    const nextYear = nextDate.getFullYear();
    const nextMonth = nextDate.getMonth();
    return `${nextYear}-${numberUtil.getZeroNumber(nextMonth + 1)}-${numberUtil.getZeroNumber(date)}`;
  }
}
