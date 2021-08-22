import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import { useSelector } from '~utils/redux/hooks'

import IntroPage from './IntroPage';
import NotFoundPage from './NotFoundPage';
import LoginPage from '~routes/LoginPage';
import RegisterPage from '~routes/RegisterPage';
import ConfirmToken from '~routes/ConfirmTokenPage/ConfirmTokenPage';
import FullLoader from '../components/molecules/FullLoader';
import UserLoggedInPage from './UserLoggedInPage';


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
          <NotFoundPage default />
        </Router>
      }

      { userInfo &&
        <UserLoggedInPage /> 
      }

    </div>
  );
};



export default App;
