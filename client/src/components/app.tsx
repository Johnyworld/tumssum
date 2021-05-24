import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import useStore from '../utils/context/useStore';

const App: FunctionalComponent = () => {

  console.log('===== app', );

  return (
    <div id="preact_root">
      <div style={{ height: '100px' }}></div>
      <Header />
      <Acomp />
      <Bcomp />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

const Acomp = () => {
  const { theme, handleChangeTheme } = useStore('mode');
  return (
    <button onClick={handleChangeTheme}>{theme}</button>
  )
}

const Bcomp = () => {
  return (
    <button>Hello</button>
  )
}

export default App;
