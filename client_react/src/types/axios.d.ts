import * as axios from 'axios'

declare module 'axios' {
  interface AxiosResponse {
		ok: boolean;
		code: number;
		message: string;
		data: any;
  }
}
