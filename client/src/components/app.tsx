import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import { useSelector } from '~utils/redux/hooks'

import IntroPage from '../routes/IntroPage';
import NotFoundPage from '../routes/NotFoundPage';
import LoginPage from '~routes/LoginPage';
import RegisterPage from '~routes/RegisterPage';
import ConfirmToken from '~routes/ConfirmTokenPage/ConfirmTokenPage';
import HomePage from '~routes/HomePage';
import FullLoader from './items/FullLoader';
import BudgetPage from '~routes/BudgetPage';
import CategoryPage from '~routes/CategoryPage';
import BankPage from '~routes/BankPage';


const App: FunctionalComponent = () => {

  const { userInfo } = useSelector(state=> state.user);
 

  return (
    <div id="preact_root">
    

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
          <Route path="/budget" component={BudgetPage} />
          <Route path="/category" component={CategoryPage} />
          <Route path="/bank" component={BankPage} />
          <NotFoundPage default />
        </Router>
      }

    </div>
  );
};

export default App;
