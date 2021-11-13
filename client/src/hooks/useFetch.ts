import axios from "axios";
import { useTranslation } from "preact-i18next";
import { useCallback, useEffect, useState } from "preact/hooks"
import { useSelector } from "~utils/redux/hooks";


interface ErrorObj {
	code: string;
	message: string;
}

interface UseFetchParams<S> {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	url: string;
	params?: {},
	isNoFetchWithoutCall?: boolean,
	onError?: (error: ErrorObj) => void;
	onSuccess?: (data: S) => void;
}

const useFetch = <S>({ method, url, params, isNoFetchWithoutCall, onError, onSuccess }:UseFetchParams<S>) => {

	const { t } = useTranslation();
	const user = useSelector(state=> state.user.userInfo);
	const [data, setData] = useState<S | null>(null);
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ErrorObj>({ code: '', message: '' });

	const fetching = useCallback((reqData?: any, params?: any) => {

		if (loading) return;
		setLoading(true);

		let sendingData = reqData;
		let sendingParams = params;
		if (user && reqData) sendingData = {...reqData, user_id: user.id};
		if (user && params) sendingParams = {...params, user_id: user.id};
		console.log('%c:: 📝 REQUEST :: ', 'color: #bada55', method, url, { data: sendingData, params: sendingParams },);

		axios({
			method,
			url,
			headers: user && {
				'Authorization': `Bearer ${user.access}`,
			},
			data: sendingData,
			params: sendingParams,
		}).then((res: any) => {
			console.log('%c:: 📦 RESPONSE :: ', 'color: #00c5ff', method, url, res);
			if (res.ok && !res.code) {
				res.data && setData(res.data);
				setError({ code: '', message: '' });
				setLoading(false);
				setLoaded(true);

			} else {
				setError({ code: res.code, message: t(res.code) });
				setLoading(false);
				setLoaded(true);
			}
		}).catch(err => {
			console.error(err);
			const errObj = { code: err.message || err, message: err.message || err };
			setError(errObj);
			setLoading(false);
			setLoaded(true);
		});
	}, [loading, error, data]);


	useEffect(() => {
		if (loading) return;
		if (error.code && onError) onError(error);
		else if (data && onSuccess) onSuccess(data);
	}, [user, data, loading, error]);


	useEffect(() => {
		if (method === 'GET' && !isNoFetchWithoutCall) fetching(null, params || {});
	}, []);


	const call = useCallback((reqData?: any) => {
		fetching(reqData);
	}, []);


	return {
		data, loading, loaded, error, call,
	}
}

export default useFetch;