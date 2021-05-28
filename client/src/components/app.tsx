import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import useStore from '../utils/context/useStore';
import { useAppSelector, useAppDispatch } from '../hooks'
import { increment } from '../counterSlice';

const App: FunctionalComponent = () => {

  const { theme, handleChangeTheme } = useStore('mode');

  return (
    <div id="preact_root">
      <div style={{ height: '100px' }}></div>
      <button onClick={handleChangeTheme}>{theme}</button>
      <Counter />
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

const Counter = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(increment());
  }

  return <button onClick={handleClick}>{count}</button>
}

export default App;
