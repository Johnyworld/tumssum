import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "~/utils/api";


export default () => {

	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState(0);

	const handleRegister = async (name: string, email: string) => {
		setLoading(true);
		try {
			await api.auth.register(name, email);
			setError(0);
      alert('가입 되었어요! 로그인해주세요.');
      navigate(`/login?email=${email}`);
		}	
		catch (err) { setError(err as number) }
		finally { setLoading(false) }
	}
	
	return {
		loading,
		error,
		handleRegister,
	};
}