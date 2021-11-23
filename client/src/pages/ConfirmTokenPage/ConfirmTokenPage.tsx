import axios from 'axios';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { setUser } from '~stores/userSlice';
import { getQueryObj } from '~utils/location';
import { useDispatch } from '~utils/redux/hooks';


const ConfirmTokenPage = () => {
  const dispatch = useDispatch();
  const queryObj = getQueryObj<{ email: string, token: string }>();
  useEffect(() => {
    axios.post('/api/login/', { username: queryObj.email, password: queryObj.token }).then(res => {
      if (res.data) dispatch(setUser(res.data));
      route('/');
    }).catch(res => {
      route('/');
    });
  }, []);
  return null
}

export default ConfirmTokenPage;
