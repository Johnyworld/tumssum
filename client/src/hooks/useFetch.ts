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
	fetchWithCallOnly?: boolean;
	onError?: (error: ErrorObj) => void;
	onSuccess?: (data: S | null) => void;
}

const useFetch = <S>({ method, url, onError, onSuccess }:UseFetchParams<S>) => {

	const { t } = useTranslation();
	const [data, setData] = useState<S | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ErrorObj>({ code: '', message: '' });

	const fetching = (reqData?: any) => {

		if (loading) return;
		setLoading(true);

		axios({
			method,
			url,
			data: reqData,
		}).then((res: any) => {
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


	const call = (reqData?: any) => {
		fetching(reqData);
	}


	return {
		data, loading, error, call,
	}
}

export default useFetch;