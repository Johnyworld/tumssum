import 'axios';

declare module 'axios' {
  interface AxiosResponse<T> {
    ok: boolean;
    code: string;
    message: string;
    data: T;
  }
}
