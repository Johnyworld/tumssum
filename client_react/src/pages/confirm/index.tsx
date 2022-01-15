import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '~/utils/reduxHooks';
import useQuery from '~/hooks/useQuery';
import { setUser } from '~/stores/userSlice';
import routes from '~/utils/routes';


const ConfirmPage: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const email = useQuery('email');
	const token = useQuery('token');
  useEffect(() => {
    axios.post('/api/login/', { username: email, password: token }).then(res => {
      if (res.data) dispatch(setUser(res.data));
      navigate(routes.home);
    }).catch(res => {
      navigate(routes.home);
    });
  }, []);
  return null;
}

export default ConfirmPage;
