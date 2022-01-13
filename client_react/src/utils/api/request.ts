import axios, { AxiosResponse } from "axios";
import errors from "~/fixtures/errors";
import Err from "../err/Err";

export default async <T>(method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', url: string, payload: any) => {
	console.log('%c:: 📝 REQUEST :: ', 'color: #bada55', method, url, payload);

	try {
		const res: AxiosResponse<T> = await axios({ method, url, [method === 'GET' ? 'params' : 'data']: payload });
		console.log('%c:: 📦 RESPONSE :: ', 'color: #00c5ff', method, url, res);

		const { ok, code, message, data } = res;
		// Response는 정상적으로 왔지만 서버에서 에러 처리를 한 경우
		// - 에러 메시지는 errors.ts에 준비 된 에러 메시지를 throw 합니다.
		// - 에러 메시지가 없는 경우 서버에서 응답받은 message를 throw 합니다.
		// - TODO 에러 메시지는 추후에 i18next 의존성이 추가되면, i18n.t 함수로 대체 됩니다.
		if (!ok) throw new Err(code, errors[code] || message);

		// 정상 응답 수신
		else return { code, data };

	} catch (err) {
		// 알 수 없는 에러가 발생한 경우
		// 서버에서 처리하지 못 한 에러이거나, 클라이언트 측 오류일 수 있음.
		const { code, message } = err as Err;
		throw new Err(
			code || 'UNKNOWN_ERROR',
			message || errors['UNKNOWN_ERROR']
		);
	}
}
