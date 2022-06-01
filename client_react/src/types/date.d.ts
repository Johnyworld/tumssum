declare module 'types' {
  interface DayItem {
    yyyymmdd: string;
    isThisMonth?: boolean;
    isToday?: boolean;
    accounts?: Account[];
  }

  /** 2022-02-10T03:00:00.000Z */
  type ISOString = string;
  /** 2022-02-10T12:00:00 */
  type YYYYMMDDHHmmss = string
  /** 2022-02-10 */
  type YYYYMMDD = string;
  /** 2022-02 */
  type YYYYMM = string;
  /** 12:00:00 */
  type HHmmss = string;
  /** 12:00 */
  type HHmm = string;
  /** 2022. 02. 10. | 10 Feb 2022 */
  type LocalStringYMD = string;
  /** 2022. 02. | Feb 2022 */ 
  type LocalStringYM = string;
  /** 02 | Feb */
  type LocalStringM = string;
}
