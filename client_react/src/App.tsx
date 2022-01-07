import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from './hooks';
import { changeTheme } from './stores/modeSlice';

import IndexPage from '~/pages';
import LoginPage from '~/pages/login';
import RegisterPage from '~/pages/register';
import ConfirmPage from '~/pages/confirm';
import { getAccounts } from './stores/accountSlice';


const AppLoggedIn: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  return (
    <div className='page-container'>
      <Routes>
        <Route path='/' element={<IndexPage />} />
      </Routes>
    </div> 
  )
}

const AppNotLoggedIn: React.FC = () => {
  return (
    <div className='page-container'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/confirm' element={<ConfirmPage />} />
      </Routes>
    </div>
  )
}


const App: React.FC = () => {

  const userId = useSelector(state => state.user.userInfo?.id);
  const isLoggedIn = !!userId;

  const theme = useSelector(state => state.mode.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    dispatch(changeTheme());
  }

  return (
    <BrowserRouter>
      { !isLoggedIn && <AppNotLoggedIn /> }
      { isLoggedIn && <AppLoggedIn /> }
      <h1>{theme}</h1>
      <button onClick={handleChangeTheme}>changeTheme</button>
    </BrowserRouter>
  );
}

export default App;
