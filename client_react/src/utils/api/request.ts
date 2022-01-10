import axios, { AxiosResponse } from "axios";

export default async <T>(method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', url: string, payload: any) => {
	console.log('%c:: 📝 REQUEST :: ', 'color: #bada55', method, url, payload);

	try {
		const res: AxiosResponse<T> = await axios({ method, url, [method === 'GET' ? 'params' : 'data']: payload });
		console.log('%c:: 📦 RESPONSE :: ', 'color: #00c5ff', method, url, res);

		const { ok, code, message, data } = res;
		if (!ok) throw { code, message } // Response는 정상적으로 왔지만 서버에서 에러 처리를 한 경우
		else return { code, data }; // 정상 응답 수신

	} catch (err: any) {
		// err.code가 있는 경우는 try 에서 throw한 에러이고, err.code 가 없는 경우는 axios 요청 중 발생한 client 오류.
		const errorObject = err.code ? err : { code: 98, message: 'Unknown error on client!' };
		throw errorObject;
	}
}
