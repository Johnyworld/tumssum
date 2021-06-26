import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import Home from '../routes/Home';
import NotFoundPage from '../routes/NotFound';
import { useDispatch, useSelector } from '~utils/redux/hooks'
import { useTranslation } from 'preact-i18next';
import Login from '~routes/Login';
import ConfirmToken from '~routes/ConfirmToken/ConfirmToken';
import Register from '~routes/Register';
import ThemeChanger from '~features/theme/ThemeChanger';
import { logout } from '~features/user/userSlice';
import Button from './elements/Button';


const KAKAO_JS_KEY = process.env.KAKAO_JS_KEY;

const { Kakao } = window as any;
Kakao.init(KAKAO_JS_KEY);
Kakao.isInitialized();

const App: FunctionalComponent = () => {

  const { userInfo } = useSelector(state=> state.user);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div id="preact_root">
      <div class='flex flex-end p-regular'>
        <button onClick={() => i18n.changeLanguage('ko')}>KO</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
        <button onClick={() => i18n.changeLanguage('jp')}>JP</button>
        <ThemeChanger />
      </div>
      { userInfo && <p>{userInfo.name}님 {t('hello')}</p> }

      { userInfo && <Button onClick={handleLogout} fluid class='gap-regular' type='submit'>logout</Button> }

      { !userInfo &&
        <Router>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/confirm" component={ConfirmToken} />
          <NotFoundPage default />
        </Router>
      }

      { userInfo &&
        <Router>
          <Route path="/" component={Home} />
          <NotFoundPage default />
        </Router>
      }

    </div>
  );
};

export default App;
