import { Fragment, FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { useSelector, useDispatch } from '~utils/redux/hooks'
import { changeTheme } from '~features/mode/modeSlice';
import useInput from '~hooks/useInput';
import { set, logout, sendEmail, socialLogin } from '~features/user/userSlice';
import { useTranslation } from 'preact-i18next';
import useThemeColors from '~hooks/useTheme';
import Button from './elements/button';
import axios from 'axios';
import { useEffect } from 'preact/hooks';
import { useLocation } from 'wouter';


const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;
const { Kakao } = window as any;
Kakao.init(KAKAO_JS_KEY);
Kakao.isInitialized();

const App: FunctionalComponent = ({  }) => {

  const { t, i18n } = useTranslation();


  return (
    <div id="preact_root">
      <div style={{ height: '100px' }}></div>
      <button onClick={() => i18n.changeLanguage('ko')}>KO</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <button onClick={() => i18n.changeLanguage('jp')}>JP</button>
      <p>{t('hello')}</p>
      <Theme />
      <ThemeColor />
      <Auth />
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={TokenLogin} />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

const getQueryObj = <T extends {}> (search: string): T => {
  const arr = window.location.search.substr(1).split('&');
  return arr.reduce((prev, curr) => {
    const split = curr.split('=');
    return { ...prev, [split[0]]: split[1] }
  }, {} as T);
}

const TokenLogin: FunctionalComponent = () => {
  const dispatch = useDispatch();
  const [_, setLocation] = useLocation();
  const queryObj = getQueryObj<{ email: string, token: string }>(window.location.search);
  useEffect(() => {
    axios.post('/api/login/', { username: queryObj.email, password: queryObj.token }).then(res => {
      dispatch(set(res.data));
      setLocation('/');
    }).catch(res => {
      setLocation('/');
    });
  }, []);
  return null
}


const Auth = () => {

  const { t } = useTranslation();
  const { userInfo, sent, loading, error } = useSelector(state=> state.user);
  const [ email, changeEmail, setEmail ] = useInput('');
  const dispatch = useDispatch();


  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( userInfo ) {
      dispatch(logout());

    } else {
      dispatch(sendEmail({ email }));
      setEmail('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      { userInfo
        ? <button disabled={loading} type='submit'>logout</button>
        : <Fragment>
            <input value={email} onChange={changeEmail} ></input>
            <button disabled={loading} type='submit'>login</button>
            <KakaoLogin />
          </Fragment>
      }
      {error && <p>{t(error)}</p>}
      {sent && <p>{'이메일을 전송했습니다.'}</p>}
    </form>
  )
}



const KakaoLogin: FunctionalComponent = () => {

  const { Kakao } = window as any;
  const dispatch = useDispatch();

  const signIn = () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken"; // 서버에 CSFR 토큰을 넘겨야 함.
    Kakao.Auth.login({
      scope: 'profile',
      success: (res: any) => {
        console.log('first res:', res)
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
        .then((res) => {
          if (res.status === 203) { // 가입되지 않은 사용자일 경우 회원가입 부분으로 넘김
          } else if (res.status === 200) { // 가입된 사용자일 경우 로그인 성공 처리
            dispatch(socialLogin(res.data));
          }
        })
        .catch((err) => console.log(err))
      }, 
      fail: (err: any) => {
          console.error(err);
      }
    });
  };

  return (
    <button onClick={signIn} type='button'>Kakao Frontend Login</button>
  )
}


const ThemeColor = () => {
  const themeColors = useThemeColors(['paper', 'pen', 'bg']);

  console.log('===== themeColor', themeColors);
  return <p style={{ backgroundColor: themeColors.paper }}>HAHAHA</p>
}

const Theme = () => {
  const theme = useSelector(state => state.mode.theme)
  const dispatch = useDispatch()
  console.log('===== theme', theme);

  return <Button onClick={() => dispatch(changeTheme())}>{theme}</Button>
}

export default App;
