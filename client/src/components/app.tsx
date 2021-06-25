import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import Home from '../routes/Home';
import NotFoundPage from '../routes/NotFound';
import { useSelector } from '~utils/redux/hooks'
import { useTranslation } from 'preact-i18next';
import Login from '~routes/Login';
import ConfirmToken from '~routes/ConfirmToken/ConfirmToken';
import Register from '~routes/Register';
import ThemeChanger from '~features/theme/ThemeChanger';


const KAKAO_JS_KEY = process.env.KAKAO_JS_KEY;

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
        <ThemeChanger />
      </div>
      { userInfo && <p>{userInfo.name}님 {t('hello')}</p> }
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

export default App;
