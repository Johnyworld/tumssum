import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '~/hooks';
import useQuery from '~/hooks/useQuery';
import { setUser } from '~/stores/userSlice';


const ConfirmPage: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const email = useQuery('email');
	const token = useQuery('token');
  useEffect(() => {
    axios.post('/api/login/', { username: email, password: token }).then(res => {
      if (res.data) dispatch(setUser(res.data));
      navigate('/');
    }).catch(res => {
      navigate('/');
    });
  }, []);
  return null;
}

export default ConfirmPage;
