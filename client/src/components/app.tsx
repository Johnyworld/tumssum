import { Fragment, FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { useSelector, useDispatch } from '~utils/redux/hooks'
import { changeTheme } from '~features/mode/modeSlice';
import useInput from '~hooks/useInput';
import { login, logout } from '~features/user/userSlice';
import { useTranslation } from 'preact-i18next';
import useThemeColors from '~hooks/useTheme';
import Button from './elements/button';
import axios from 'axios';


const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;
const { Kakao } = window as any;
Kakao.init(KAKAO_JS_KEY);
Kakao.isInitialized();

const App: FunctionalComponent = () => {

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
      <KakaoLogin />
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

const Auth = () => {

  const { userInfo, loading, error } = useSelector(state=> state.user);
  const [ email, changeEmail, setEmail ] = useInput('');
  const [ password, changePassword, setPassword ] = useInput('');
  const dispatch = useDispatch();


  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( userInfo ) {
      dispatch(logout());

    } else {
      dispatch(login({ email, password }));
      setEmail('');
      setPassword('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      { userInfo
        ? <button disabled={loading} type='submit'>logout</button>
        : <Fragment>
            <input value={email} onChange={changeEmail} ></input>
            <input value={password} type='password' onChange={changePassword} ></input>
            <button disabled={loading} type='submit'>login</button>
          </Fragment>
      }
      {error && <p>{error}</p>}
    </form>
  )
}



const KakaoLogin: FunctionalComponent = () => {

  const { Kakao } = window as any;

  console.log('===== kakao', Kakao);
  console.log('===== auth', Kakao.Auth);

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
            window.alert("register");
          } else if (res.status === 200) { // 가입된 사용자일 경우 로그인 성공 처리
            window.alert("login completed");
            console.log('===== res', res);
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
    <div>
      <button onClick={signIn} type='button'>Kakao Frontend Login</button>
      <a target='_blank' href='http://localhost:8000/api/login/kakao'>
        <button>Kakao Login</button>
      </a>
    </div>
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
