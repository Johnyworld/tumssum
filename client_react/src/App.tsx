import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from './hooks';

import IndexPage from '~/pages';
import LoginPage from '~/pages/login';
import RegisterPage from '~/pages/register';
import ConfirmPage from '~/pages/confirm';
import { getAccounts } from './stores/accountSlice';
import RenderConfirm from './RenderConfirm';
import useConfirm from './hooks/useConfirm';


const AppLoggedIn: React.FC = () => {

  // const dispatch = useDispatch();

  const confirm = useConfirm();

  // useEffect(() => {
  //   dispatch(getAccounts());
  // }, []);

  const onClick = () => {
    confirm('Are you sure?', () => {
      console.log('Okay!');
    });
  }

  return (
    <div className='page-container'>
      <button onClick={onClick}>TEST</button>
      <Routes>
        <Route path='/' element={<IndexPage />} />
      </Routes>
    </div> 
  )
}

const AppNotLoggedIn: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/confirm' element={<ConfirmPage />} />
    </Routes>
  )
}


const App: React.FC = () => {

  const userId = useSelector(state => state.user.userInfo?.id);
  const isLoggedIn = !!userId;

  return (
    <BrowserRouter>
      { !isLoggedIn && <AppNotLoggedIn /> }
      { isLoggedIn && <AppLoggedIn /> }
      <RenderConfirm />
    </BrowserRouter>
  );
}

export default App;
