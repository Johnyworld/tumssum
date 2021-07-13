import axios from "axios";
import { useTranslation } from "preact-i18next";
import { useEffect, useState } from "preact/hooks"


interface ErrorObj {
	code: string;
	message: string;
}

interface UseFetchParams<S> {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	url: string;
	params: {},
	onError?: (error: ErrorObj) => void;
	onSuccess?: (data: S) => void;
}

const useFetch = <S>({ method, url, params, onError, onSuccess }:UseFetchParams<S>) => {

	const { t } = useTranslation();
	const [data, setData] = useState<S | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ErrorObj>({ code: '', message: '' });

	const fetching = (reqData?: any, params?: any) => {

		if (loading) return;
		setLoading(true);

		console.log(':: REQUEST :: ', method, url, { reqData, params });

		axios({
			method,
			url,
			data: reqData,
			params,
		}).then((res: any) => {
			console.log(':: RESPONSE :: ', res);
			if (res.ok && !res.code) {
				res.data && setData(res.data);
				setError({ code: '', message: '' });
				setLoading(false);

			} else {
				setError({ code: res.code, message: t(res.code) });
				setLoading(false);
			}
		}).catch(err => {
			console.error(err);
			const errObj = { code: err.message || err, message: err.message || err };
			setError(errObj);
			setLoading(false);
		});
	}

	useEffect(() => {
		if (loading) return;
		if (error.code && onError) onError(error);
		else if (data && onSuccess) onSuccess(data);
	}, [data, loading, error]);

	useEffect(() => {
		if (params) fetching(null, params);
	}, []);


	const call = (reqData?: any) => {
		fetching(reqData);
	}


	return {
		data, loading, error, call,
	}
}

export default useFetch;