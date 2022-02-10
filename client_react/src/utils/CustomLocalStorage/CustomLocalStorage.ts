import { User } from 'types';

const USER_INFO = 'tmsmusrinfo';

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

  setUserInfo(data: User): void {
    localStorage.setItem(USER_INFO, JSON.stringify(data));
  }

  removeUserInfo(): void {
    localStorage.removeItem(USER_INFO);
  }
}
