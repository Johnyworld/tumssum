import * as axios from 'axios'

declare module 'axios' {
  interface AxiosResponse {
		ok: boolean;
		code: string;
		message: string;
		data: any;
  }
}
