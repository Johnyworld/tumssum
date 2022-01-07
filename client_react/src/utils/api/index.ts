import axios from "axios"
import { Account, ApiResponse } from "types"

interface Api {
	accounts: {
		getList: () => Promise<ApiResponse<Account[]>>
	}
}

export default {
	accounts: {
		getList: async () => {
			try { return await axios.get('/api/accsounts/') }
			catch (err) { throw 98 }
		}
	}
} as Api;