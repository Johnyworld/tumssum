import axios from "axios"
import { Account, ApiResponse } from "types"

type Res<T> = Promise<ApiResponse<T>>

interface Api {
	auth: {
		sendEmail: (email: string) => Res<null>;
	},
	accounts: {
		getList: () => Res<Account[]>
	}
}

export default {
	auth: {
		sendEmail: async (email) => {
			try { return await axios.get('/api/login/send/', { params: { email }}) }
			catch (err) { throw 98 }
		}
	},
	accounts: {
		getList: async () => {
			try { return await axios.get('/api/accounts/') }
			catch (err) { throw 98 }
		},
	}
} as Api;