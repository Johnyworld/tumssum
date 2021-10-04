import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import { useSelector } from '~utils/redux/hooks'

import IntroPage from './IntroPage';
import LoginPage from '~routes/LoginPage';
import RegisterPage from '~routes/RegisterPage';
import ConfirmToken from '~routes/ConfirmTokenPage/ConfirmTokenPage';
import FullLoader from '../components/molecules/FullLoader';
import AppLoggedInRouter from './AppLoggedInRouter';
import Redirect from './Redirect';


const App: FunctionalComponent = () => {

  const { userInfo } = useSelector(state=> state.user);
 
  return (
    <div id='preact_root'>
    
      <FullLoader />

      { !userInfo &&
        <Router>
          <Route path="/" component={IntroPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/confirm" component={ConfirmToken} />
          <Redirect default to='/' />
        </Router>
      }

      { userInfo &&
        <AppLoggedInRouter /> 
      }

    </div>
  );
};



export default App;
