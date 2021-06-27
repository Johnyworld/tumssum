import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import { useSelector } from '~utils/redux/hooks'
import { useTranslation } from 'preact-i18next';

import IntroPage from '../routes/IntroPage';
import NotFoundPage from '../routes/NotFoundPage';
import LoginPage from '~routes/LoginPage';
import RegisterPage from '~routes/RegisterPage';
import ConfirmToken from '~routes/ConfirmTokenPage/ConfirmTokenPage';
import HomePage from '~routes/HomePage';
import FullLoader from './items/FullLoader';


const App: FunctionalComponent = () => {

  const { userInfo } = useSelector(state=> state.user);
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => () => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute("lang", lang);
  }

  return (
    <div id="preact_root">
      {/* <div class='flex flex-end p-regular'>
        <button onClick={handleChangeLanguage('ko')}>KO</button>
        <button onClick={handleChangeLanguage('en')}>EN</button>
        <ThemeChanger />
      </div> */}

      <FullLoader />

      { !userInfo &&
        <Router>
          <Route path="/" component={IntroPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/confirm" component={ConfirmToken} />
          <NotFoundPage default />
        </Router>
      }

      { userInfo &&
        <Router>
          <Route path="/" component={HomePage} />
          <NotFoundPage default />
        </Router>
      }

    </div>
  );
};

export default App;
