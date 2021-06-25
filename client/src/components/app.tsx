import { Fragment, FunctionalComponent, h } from 'preact';
import { Link, Route, Router, route } from 'preact-router';
import Home from '../routes/Home';
import NotFoundPage from '../routes/NotFound';
import { useSelector, useDispatch } from '~utils/redux/hooks'
import { changeTheme } from '~features/mode/modeSlice';
import useInput from '~hooks/useInput';
import { setUser, logout } from '~features/user/userSlice';
import { useTranslation } from 'preact-i18next';
import useThemeColors from '~hooks/useTheme';
import Button from './elements/Button';
import axios from 'axios';
import { StateUpdater, useEffect, useRef, useState } from 'preact/hooks';


const KAKAO_JS_KEY = process.env.KAKAO_JS_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const { Kakao } = window as any;
Kakao.init(KAKAO_JS_KEY);
Kakao.isInitialized();

const App: FunctionalComponent = () => {

  const { userInfo } = useSelector(state=> state.user);
  const { t, i18n } = useTranslation();

  return (
    <div id="preact_root">
      <div class='flex end p-regular'>
        <button onClick={() => i18n.changeLanguage('ko')}>KO</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
        <button onClick={() => i18n.changeLanguage('jp')}>JP</button>
        <Theme />
      </div>
      { userInfo && <p>{userInfo.name}님 {t('hello')}</p> }
      <div>
        <Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/'>Home</Link>
        <Link style={{ padding: '4px 0', display: 'inline-block', marginRight: '4px' }} href='/register'>Register</Link>
        <Link style={{ padding: '4px 0', display: 'inline-block' }} href='/login'>Login</Link>
      </div>
      <ThemeColor />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/confirm" component={ConfirmToken} />
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
            <KakaoLogin disabled={loading} setLoading={setLoading} />
            <GoogleLogin disabled={loading} setLoading={setLoading} />
          </Fragment>
      }
      {loading && <p>Loading...</p>}
      {error && <p>{t(error)}</p>}
      {sent && <p>{'이메일을 전송했습니다.'}</p>}
    </form>
  )
}


const GoogleLogin: FunctionalComponent<{disabled?: boolean; setLoading: StateUpdater<boolean>}> = ({ disabled, setLoading }) => {
  
  const id = 'google-jssdk';
  const googleLoginBtn = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    createScript();
    return () => removeScript();
  }, [googleLoginBtn.current])

  const googleSDK = () => {
    let { gapi } = window as any;
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'profile email',
      });
      //버튼 클릭시 사용자 정보 불러오기
      auth2.attachClickHandler(googleLoginBtn.current, {}, (googleUser: any) => {
        setLoading(true);
        axios.post('/api/login/google/', {
          access_token: googleUser.mc.access_token,
          email: googleUser.dt.Nt,
          name: googleUser.dt.Ue,
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
      }, (error: any) => { alert(JSON.stringify(error, undefined, 2)) });
    });
  }

  const createScript = () => {
    const id = 'google-jssdk';
    if (!document.getElementById(id)) {
      let js;
      const fjs = document.getElementsByTagName('script')[0];
      if (document.getElementById(id)) {
        return;
      }
      js = document.createElement('script');
      js.id = id;
      js.onload = () => {
        googleSDK();
      }
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      if ( fjs && fjs.parentNode ) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    }
  }

  const removeScript = () => {
    const script = document.getElementById(id);
    script?.remove();
  }

  return (
    <button ref={googleLoginBtn} disabled={disabled} type='button'>Google Login</button>
  )
}


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
