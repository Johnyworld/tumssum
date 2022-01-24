import { Account } from "types"
import request from "./request";

/**
 * 모든 API 요청을 여기서 관리합니다.
 * RTK thunk 에서 요청하는 API도 여기를 통해야 합니다.
 * 어떤 parameter를 받고 어떤 값을 return 받는지 한 눈에 파악할 수 있습니다.
 * 성공적으로 API response를 받았을 때 data에 포함되는 타입은 await request<Here> 에 지정합니다.
 */
const api = {
	auth: {
		sendEmail: async (email: string) => await request<null>('GET', '/api/login/send/', { email }),
		register: async (name: string, email: string) => await request<null>('POST', '/api/register/', { name, email }),
	},
	accounts: {
		getList: async () => await request<Account[]>('GET', '/api/accounts/', {}),
	}
};

export default api;
