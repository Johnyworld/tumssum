import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from './hooks';
import { changeTheme } from './stores/modeSlice';

import IndexPage from '~/pages';
import LoginPage from '~/pages/login';
import RegisterPage from '~/pages/register';
import ConfirmPage from '~/pages/confirm';


const App: React.FC = () => {

  const userInfo = useSelector(state => state.user.userInfo);
  const isLoggedIn = false;

  const theme = useSelector(state => state.mode.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    dispatch(changeTheme());
  }

  return (
    <BrowserRouter>

      { !isLoggedIn &&
        <div className='page-container'>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/confirm' element={<ConfirmPage />} />
          </Routes>
        </div>
      }

      { isLoggedIn &&
        <div className='page-container'>
          <Routes>
            <Route path='/' element={<IndexPage />} />
          </Routes>
        </div>
      }

      <h1>{theme}</h1>
      <button onClick={handleChangeTheme}>changeTheme</button>
    </BrowserRouter>
  );
}

export default App;
