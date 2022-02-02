import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '~/utils/api';

export default function useRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleRegister = async (name: string, email: string) => {
    setLoading(true);
    const { ok, message } = await api.auth.register(name, email);
    if (!ok) setError(message);
    else {
      setError('');
      alert('가입 되었어요! 로그인해주세요.');
      navigate(`/login?email=${email}`);
    }
    setLoading(false);
  };

  return {
    loading,
    error,
    handleRegister,
  };
}
