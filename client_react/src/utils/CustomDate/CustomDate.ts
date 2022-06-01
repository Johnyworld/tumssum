import i18next from 'i18next';
import { HHmmss, ISOString, LocalStringM, LocalStringYM, LocalStringYMD, YYYYMM, YYYYMMDD, YYYYMMDDHHmmss } from 'types';
import numberUtil from '../numberUtil';

const { getZeroNumber } = numberUtil;
const englishMonthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class CustomDate {
  date: Date;
  hasTime: boolean;
  constructor(defaultDate?: string) {
    this.date = defaultDate ? new Date(defaultDate) : new Date();
    this.hasTime = !!defaultDate && defaultDate.includes('T') && defaultDate.length > 15;
  }

  /**
   * ISO String을 리턴합니다.
   * @returns 2022-02-10T03:00:00.000Z
   */
  getIsoString(): ISOString {
    return this.date.toISOString();
  }

  /**
   * ISO String과 같은 형식의 Local Date String을 리턴합니다.
   * @returns 2022-02-10T12:00:00 (from 2022-02-10T03:00:00.000Z)
   */
  getLocalDatetime(): YYYYMMDDHHmmss {
    return `${this.getLocalDate()}T${this.getLocalTime()}`;
  }

  /**
   * 지역의 연도-월 String을 리턴합니다.
   * @returns 2022-02-10
   */
  getLocalDate(): YYYYMMDD {
    const DATE = this.date.getDate();
    return `${this.getLocalYearMonth()}-${getZeroNumber(DATE)}`;
  }

  /**
   * 지역의 연도-월 String을 리턴합니다.
   * @returns 2022-02
   */
  getLocalYearMonth(): YYYYMM {
    const YEAR = this.date.getFullYear();
    const MONTH = this.date.getMonth() + 1;
    return `${YEAR}-${getZeroNumber(MONTH)}`;
  }

  /**
 * 지역의 시간 String을 리턴합니다.
 * @returns 12:00:00
 */
  getLocalTime(): HHmmss {
    if (!this.hasTime) return '';
    const hm = this.getLocalHoursMinutes();
    const s = this.date.getSeconds();
    return `${hm}:${getZeroNumber(s)}`;
  }

  /**
 * 지역의 시간 String을 리턴합니다.
 * @returns 12:00:00
 */
  getLocalHoursMinutes(): HHmmss {
    if (!this.hasTime) return '';
    const h = this.date.getHours();
    const m = this.date.getMinutes();
    return `${getZeroNumber(h)}:${getZeroNumber(m)}`;
  }

  /**
   * 국가별 날짜 표기를 리턴합니다.
   * @returns 2022. 02. 10. | 10 Feb 2022
   */
  getLocalString(): LocalStringYMD {
    const arr = [this.date.getDate(), this.getMonthString(), this.date.getFullYear()];
    if (i18next.language === 'ko') return arr.reverse().join('. ') + '.';
    return arr.join(' ');
  }

  /**
   * 국가별 날짜 표기를 리턴합니다.
   * @returns 2022. 02. | Feb 2022
   */
  getLocalStringYearAndMonth(): LocalStringYM {
    const arr = [this.getMonthString(), this.date.getFullYear()];
    if (i18next.language === 'ko') return arr.reverse().join('. ') + '.';
    return arr.join(' ');
  }

  /**
   * 달을 변경합니다.
   */
  setMonth(sum: number): void {
    this.date.setMonth(this.date.getMonth() + sum);
  }

 

  /**
   * 국가별 달 표기를 리턴합니다.
   * @returns 02 | Feb
   */
  private getMonthString(): LocalStringM {
    const M = this.date.getMonth();
    if (i18next.language === 'ko') return String(M + 1);
    return englishMonthes[M];
  }
}
