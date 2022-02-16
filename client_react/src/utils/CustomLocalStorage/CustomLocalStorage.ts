import { User } from 'types';

const USER_INFO = 'tmsmusrinfo';
const ACCOUNT_MANAGER_MENU = 'tmsmaccountmanagermenu';

const keys = [USER_INFO, ACCOUNT_MANAGER_MENU] as const;

type Keys = typeof keys[number];

export default class CustomLocalStorage {
  static instance: any;
  constructor() {
    if (CustomLocalStorage.instance) return CustomLocalStorage.instance;
    CustomLocalStorage.instance = this;
  }

  getUserInfo(): User | null {
    const item = localStorage.getItem(USER_INFO);
    return item ? (JSON.parse(item) as User) : null;
  }

  getAccountManagerMenu(): string | null {
    const item = localStorage.getItem(ACCOUNT_MANAGER_MENU);
    return item || null;
  }

  setUserInfo(data: User): void {
    localStorage.setItem(USER_INFO, JSON.stringify(data));
  }

  setAccountManagerMenu(selected: string): void {
    localStorage.setItem(ACCOUNT_MANAGER_MENU, selected);
  }

  removeItem(key: Keys): void {
    localStorage.removeItem(key as string);
  }
}
