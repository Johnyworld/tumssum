import i18next from 'i18next';
import { HHmm, HHmmss, ISOString, LocalStringM, LocalStringYM, LocalStringYMD, YYYYMM, YYYYMMDD, YYYYMMDDHHmmss } from 'types';
import numberUtil from '../numberUtil';

const { getZeroNumber } = numberUtil;
const englishMonthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class CustomDate {
  date: Date;
  hasTime: boolean;
  constructor(defaultDate?: string | Date | CustomDate) {
    if (defaultDate instanceof CustomDate) {
      this.date = defaultDate.date;
      this.hasTime = defaultDate.hasTime;
    } else if (defaultDate instanceof Date) {
      this.date = defaultDate;
      this.hasTime = true;
    } else {
      this.date = defaultDate ? new Date(defaultDate) : new Date();
      this.hasTime = !!defaultDate && defaultDate.includes('T') && defaultDate.length > 15;
    }
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
  getLocalYYYYMMDDHHmmss(): YYYYMMDDHHmmss {
    return `${this.getLocalYYYYMMDD()}T${this.getLocalHHmmss()}`;
  }

  /**
   * 지역의 연도-월 String을 리턴합니다.
   * @returns 2022-02-10
   */
  getLocalYYYYMMDD(): YYYYMMDD {
    const DATE = this.date.getDate();
    return `${this.getLocalYYYYMM()}-${getZeroNumber(DATE)}`;
  }

  /**
   * 지역의 연도-월 String을 리턴합니다.
   * @returns 2022-02
   */
  getLocalYYYYMM(): YYYYMM {
    const YEAR = this.date.getFullYear();
    const MONTH = this.date.getMonth() + 1;
    return `${YEAR}-${getZeroNumber(MONTH)}`;
  }

  /**
 * 지역의 시간 String을 리턴합니다.
 * @returns 12:00:00
 */
  getLocalHHmmss(): HHmmss {
    if (!this.hasTime) return '';
    const s = this.date.getSeconds();
    return `${this.getLocalHHmm()}:${getZeroNumber(s)}`;
  }

  /**
 * 지역의 시간 String을 리턴합니다.
 * @returns 12:00:00
 */
  getLocalHHmm(): HHmm {
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
  getLocalStringYM(): LocalStringYM {
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
   * 날짜를 변경합니다.
   */
  setYYYYMMDD(YYYYMMDD: YYYYMMDD): void {
    const [YYYY, MM, DD] = YYYYMMDD.substring(0, 10).split('-');
    if (YYYY !== undefined) this.date.setFullYear(+YYYY);
    if (MM !== undefined) this.date.setMonth((+MM) - 1);
    if (DD !== undefined) this.date.setDate(+DD);
  }

  /**
   * 시간을 변경합니다.
   */
  setHHmmss(HHmmss: HHmmss | ''): void {
    if (!HHmmss) {
      this.hasTime = false;
    } else {
      const [HH, mm, ss] = HHmmss.split(':');
      if (HH !== undefined) this.date.setHours(+HH);
      if (mm !== undefined) this.date.setMinutes(+mm);
      if (ss !== undefined) this.date.setSeconds(+ss);
      this.hasTime = true;
    }

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
