import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import { useSelector } from '~utils/redux/hooks'

import IntroPage from './IntroPage';
import LoginPage from '~pages/LoginPage';
import RegisterPage from '~pages/RegisterPage';
import ConfirmToken from '~pages/ConfirmTokenPage/ConfirmTokenPage';
import FullLoader from '../components/molecules/FullLoader';
import AppLoggedInRouter from './AppLoggedInRouter';
import Redirect from './Redirect';
import ToastRender from '~features/toast/ToastRender';
import AlertRender from '~features/alert/AlertRender';
import ConfirmRender from '~features/confirm/ConfirmRender';
import NotFoundPage from './NotFoundPage';


const App: FunctionalComponent = () => {

  const id = useSelector(state=> state.user.userInfo?.id);
  const isLoggedIn = !!id;
 
  return (
    <div id='preact_root'>
    
      <FullLoader />

      { !isLoggedIn &&
        <div class='page-container'>
          <Router>
            {/* <Route path="/" component={IntroPage} /> */}
            <Route path="/" component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/confirm" component={ConfirmToken} />
            <NotFoundPage default />
          </Router>
        </div>
      }

      { isLoggedIn &&
        <AppLoggedInRouter /> 
      }

      <ToastRender />
      <AlertRender />
      <ConfirmRender />

    </div>
  );
};



export default App;
