import { useCallback, useState } from 'react';
import api from '~/utils/api';

export default function useEmailLogin() {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = useCallback(async (email: string) => {
    setIsSent(false);
    setLoading(true);
    const { ok, message } = await api.auth.sendEmail(email);
    if (!ok) setError(message);
    else {
      setIsSent(true);
      setError('');
    }
    setLoading(false);
  }, []);

  return {
    isSent,
    loading,
    error,
    handleSend,
  };
}
