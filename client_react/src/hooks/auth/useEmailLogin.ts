import { useCallback, useState } from "react";
import api from "~/utils/api";


export default () => {

	const [isSent, setIsSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(0);

	const handleSend = useCallback(async (email: string) => {
    setIsSent(false);
    setLoading(true);
    try {
      await api.auth.sendEmail(email)
      setIsSent(true);
			setError(0);
    }
    catch (err) { setError(err as number) }
    finally { setLoading(false) }
  }, []);
	
	return {
		isSent,
		loading,
		error,
		handleSend,
	};
}