import { h, FunctionalComponent } from 'preact';
import { StateUpdater } from 'preact/hooks';
import axios from 'axios';
import { setUser } from '~features/user/userSlice';
import { useDispatch } from '~utils/redux/hooks';


const KakaoLogin: FunctionalComponent<{disabled?: boolean; setLoading: StateUpdater<boolean>}> = ({ disabled, setLoading }) => {

  const { Kakao } = window as any;
  const dispatch = useDispatch();

  const signIn = () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken"; // 서버에 CSFR 토큰을 넘겨야 함.
    Kakao.Auth.login({
      scope: 'profile',
      success: (res: any) => {
        Kakao.Auth.setAccessToken(res.access_token);
        setLoading(true);
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
        .then((res) => {
          if (res.status === 203) { // 가입되지 않은 사용자일 경우 회원가입 부분으로 넘김
          } else if (res.status === 200) { // 가입된 사용자일 경우 로그인 성공 처리
            dispatch(setUser(res.data));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err)
          setLoading(false);
        })
      }, 
      fail: (err: any) => {
        console.error(err);
      }
    });
  };

  return (
    <button disabled={disabled} onClick={signIn} type='button'>Kakao Frontend Login</button>
  )
}


export default KakaoLogin;
