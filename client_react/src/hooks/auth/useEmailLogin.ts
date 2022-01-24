import { useCallback, useState } from "react";
import api from "~/utils/api";
import CustomError from "~/utils/customError/CustomError";


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
    catch (err) {
			const { message } = err as CustomError;
			setError(message);
		}
    finally { setLoading(false) }
  }, []);
	
	return {
		isSent,
		loading,
		error,
		handleSend,
	};
}