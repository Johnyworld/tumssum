import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { useSelector, useDispatch } from '../hooks'
import { increment } from '../counterSlice';
import { changeTheme } from '~features/mode/modeSlice';

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root">
      <div style={{ height: '100px' }}></div>
      <Theme />
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

const Theme = () => {
  const theme = useSelector(state => state.mode.theme)
  const dispatch = useDispatch()
  console.log('===== theme', theme);

  return <button onClick={() => dispatch(changeTheme())}>{theme}</button>
}

const Counter = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  console.log('===== count', count);

  const handleClick = () => {
    dispatch(increment());
  }

  return <button onClick={handleClick}>{count}</button>
}

export default App;
