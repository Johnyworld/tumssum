import axios from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '~/utils/reduxHooks';
import { setUser } from '~/stores/userSlice';
import routes from '~/utils/routes';


const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;
const { Kakao } = window as any;
Kakao.init(KAKAO_JS_KEY);
Kakao.isInitialized()


export default () => {
  const { Kakao } = window as any;
  const dispatch = useDispatch();
	const navigate = useNavigate();

	const signIn = useCallback(() => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken"; // 서버에 CSFR 토큰을 넘겨야 함.
    Kakao.Auth.login({
      scope: 'profile',
			fail: (err: any) => {
        console.error(err);
      },
      success: (res: any) => {
        Kakao.Auth.setAccessToken(res.access_token);
        // const csrftoken = Cookies.get('csrftoken');
        axios.post('/api/login/kakao/', {
          access_token: res.access_token,
          headers:{
            "Access-Control-Allow-Origin": '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          //  'X-CSRFToken': csrftoken
          },
        })
        .then((res: any) => {
          if (res.ok && !res.code) {
            dispatch(setUser(res.data));
            navigate(routes.home);
          }
        })
        .catch((err) => {
          console.warn(err)
        })
      },
    });
  }, [Kakao]);
	
	return signIn;
}