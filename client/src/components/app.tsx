import { Fragment, FunctionalComponent, h } from 'preact';
import { Link, Route, Router, route } from 'preact-router';
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { useSelector, useDispatch } from '~utils/redux/hooks'
import { changeTheme } from '~features/mode/modeSlice';
import useInput from '~hooks/useInput';
import { setUser, logout } from '~features/user/userSlice';
import { useTranslation } from 'preact-i18next';
import useThemeColors from '~hooks/useTheme';
import Button from './elements/button';
import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';


const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;
const { Kakao } = window as any;
Kakao.init(KAKAO_JS_KEY);
Kakao.isInitialized();

const App: FunctionalComponent = ({  }) => {

  const { userInfo } = useSelector(state=> state.user);
  const { t, i18n } = useTranslation();

  return (
    <div id="preact_root">
      <div style={{ height: '100px' }}></div>
      <div>
        <button onClick={() => i18n.changeLanguage('ko')}>KO</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
        <button onClick={() => i18n.changeLanguage('jp')}>JP</button>
      </div>
      { userInfo && <p>{userInfo.name}님 {t('hello')}</p> }
      <div>
        <Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/'>Home</Link>
        <Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/register'>Register</Link>
        <Link style={{ padding: '4px 0', display: 'inline-block' }} href='/login'>Login</Link>
      </div>
      <Theme />
      <ThemeColor />
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/confirm" component={ConfirmToken} />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

const getQueryObj = <T extends {}> (): T => {
  const arr = window.location.search.substr(1).split('&');
  return arr.reduce((prev, curr) => {
    const split = curr.split('=');
    return { ...prev, [split[0]]: split[1] }
  }, {} as T);
}

const ConfirmToken: FunctionalComponent = () => {
  const dispatch = useDispatch();
  const queryObj = getQueryObj<{ email: string, token: string }>();
  useEffect(() => {
    axios.post('/api/login/', { username: queryObj.email, password: queryObj.token }).then(res => {
      dispatch(setUser(res.data));
      route('/');
    }).catch(res => {
      route('/');
    });
  }, []);
  return null
}

const Register = () => {

  const [ name, changeName ] = useInput('');
  const [ email, changeEmail ] = useInput('');

  // const a = useHistory();
  // console.log('===== app', a.location);

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/api/register/', { name, email }).then(res => {
      alert('회원 가입 완료!')
      route(`/login?email=${email}`);
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>이름</p>
      <input required value={name} onChange={changeName} />
      <p>이메일</p>
      <input required value={email} onChange={changeEmail} type='email' />
      <button type='submit' children='Submit' />
    </form>
  )
}

const Login = () => {

  const queryObj = getQueryObj<{ email: string }>();
  const { t } = useTranslation();
  const { userInfo } = useSelector(state=> state.user);
  const [ email, changeEmail, setEmail ] = useInput(queryObj.email || '');
  const dispatch = useDispatch();
  const [ sent, setSent ] = useState(false);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);


  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( !loading ) {
      if ( userInfo ) {
        dispatch(logout());
  
      } else {
        setLoading(true);
        axios.get(`/api/login/send?email=${email}`).then(res => {
          if ( res.status === 200 ) {
            setSent(true);
            setEmail('');
            setError('');
            setLoading(false);
          } else {
            setSent(false);
            setError('error_user_does_not_exists');
            setLoading(false);
          }
        }).catch(res => {
          setSent(false);
          setLoading(false);
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      { userInfo
        ? <button disabled={loading} type='submit'>logout</button>
        : <Fragment>
            <input value={email} onChange={changeEmail} ></input>
            <button disabled={loading} type='submit'>login</button>
            <KakaoLogin disabled={loading} />
          </Fragment>
      }
      {loading && <p>Loading...</p>}
      {error && <p>{t(error)}</p>}
      {sent && <p>{'이메일을 전송했습니다.'}</p>}
    </form>
  )
}



const KakaoLogin: FunctionalComponent<{disabled?: boolean}> = ({ disabled }) => {

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
            dispatch(setUser(res.data));
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
    <button disabled={disabled} onClick={signIn} type='button'>Kakao Frontend Login</button>
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
