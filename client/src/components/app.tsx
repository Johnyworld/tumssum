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
import { useEffect } from 'preact/hooks';
import { getThemeColor } from '~style/theme';


const App: FunctionalComponent = () => {
  const { t, i18n } = useTranslation();


  useEffect(() => {
  }, [])
  return (
    <div id="preact_root">
      <div style={{ height: '100px' }}></div>
      <button onClick={() => console.log(getThemeColor('pen'))}>Get Color</button>
      <button onClick={() => i18n.changeLanguage('ko')}>KO</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <button onClick={() => i18n.changeLanguage('jp')}>JP</button>
      <p>{t('hello')}</p>
      <Theme />
      <Auth />
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

const Theme = () => {
  const theme = useSelector(state => state.mode.theme)
  const dispatch = useDispatch()
  console.log('===== theme', theme);

  return <button onClick={() => dispatch(changeTheme())}>{theme}</button>
}

export default App;
