import { useCallback, useState } from "react";
import errors from "~/fixtures/errors";
import api from "~/utils/api";


export default () => {

	const [isSent, setIsSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSend = useCallback(async (email: string) => {
    setIsSent(false);
    setLoading(true);
    try {
      await api.auth.sendEmail(email)
      setIsSent(true);
			setError('');
    }
    catch (err: any) { setError(errors[err.code]) }
    finally { setLoading(false) }
  }, []);
	
	return {
		isSent,
		loading,
		error,
		handleSend,
	};
}