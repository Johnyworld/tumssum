declare module 'types' {
  interface DayItem {
    yyyymmdd: string;
    isThisMonth?: boolean;
    isToday?: boolean;
    accounts?: Account[];
  }
}
