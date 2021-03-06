import { h, FunctionalComponent } from 'preact';
import { route } from 'preact-router';
import { useTranslation } from 'preact-i18next';
import axios from 'axios';
import { useDispatch } from '~utils/redux/hooks';
import { setUser } from '~stores/userSlice';
import Button from '~components/atoms/Button';
import { changeFullLoading } from '~stores/modeSlice';


const KAKAO_JS_KEY = process.env.KAKAO_JS_KEY;
const { Kakao } = window as any;
Kakao.init(KAKAO_JS_KEY);
Kakao.isInitialized()


const KakaoLogin: FunctionalComponent = () => {

  const { t } = useTranslation();
  const { Kakao } = window as any;
  const dispatch = useDispatch();

  const signIn = () => {
    dispatch(changeFullLoading(true));
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken"; // 서버에 CSFR 토큰을 넘겨야 함.
    Kakao.Auth.login({
      scope: 'profile',
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
            route('/');
          }
          dispatch(changeFullLoading(false));
        })
        .catch((err) => {
          console.warn(err)
          dispatch(changeFullLoading(false));
        })
      }, 
      fail: (err: any) => {
        console.error(err);
        dispatch(changeFullLoading(false));
      }
    });
  };

  return (
    <Button fluid style={{ border: '1px solid #d4b519', background: '#f7d41e', color: '#381E1F' }} onClick={signIn} type='button'>
      <svg style={{ marginRight: '.25rem' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99993 1.99996C5.03013 1.99996 0.999931 5.08277 0.999931 8.8849C0.999931 11.3599 2.70813 13.5283 5.26953 14.7422C5.08053 15.4215 4.58733 17.205 4.49013 17.5864C4.36773 18.0602 4.66833 18.0532 4.86633 17.9261C5.02113 17.8268 7.33233 16.3063 8.32953 15.6497C8.87133 15.7281 9.42933 15.7681 9.99993 15.7681C14.9697 15.7681 18.9999 12.6853 18.9999 8.88316C18.9999 5.08103 14.9697 1.99996 9.99993 1.99996Z" fill="#381E1F"/>
      </svg>
      {t('auth_social_kakao')}
    </Button>
  )
}


export default KakaoLogin;
