import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "~/utils/api";
import CustomError from "~/utils/customError/CustomError";


export default () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState('');

	const handleRegister = async (name: string, email: string) => {
		setLoading(true);
		try {
			await api.auth.register(name, email);
			setError('');
      alert('가입 되었어요! 로그인해주세요.');
      navigate(`/login?email=${email}`);
		}	
		catch (err) {
			const { message } = err as CustomError;
			setError(message);
		}
		finally { setLoading(false) }
	}
	
	return {
		loading,
		error,
		handleRegister,
	};
}
