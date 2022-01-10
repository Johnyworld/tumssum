import { Account } from "types"
import request from "./request";

export default {
	auth: {
		sendEmail: async (email: string) => await request<null>('GET', '/api/login/send/', { email }),
		register: async (name: string, email: string) => await request<null>('POST', '/api/register/', { name, email })
	},
	accounts: {
		getList: async () => await request<Account[]>('GET', '/api/accounts/', {}),
	}
};
