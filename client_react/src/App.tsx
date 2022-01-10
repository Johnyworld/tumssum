import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from './hooks';
import { changeTheme } from './stores/modeSlice';

import IndexPage from '~/pages';
import LoginPage from '~/pages/login';
import RegisterPage from '~/pages/register';
import ConfirmPage from '~/pages/confirm';
import { getAccounts } from './stores/accountSlice';
import EmailInput from './components/molecules/inputs/EmailInput';
import Button from './components/atoms/Button';
import api from './utils/api';


const AppLoggedIn: React.FC = () => {

  const [value, setValue] = useState('');
	const [isSent, setIsSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  const handleSend = async () => {
    setIsSent(false);
    setLoading(true);
    try {
      await api.auth.sendEmail(value)
      setIsSent(true);
    }
    catch (err) { setError(err as number) }
    finally { setLoading(false) }
  }

  return (
    <div className='page-container'>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {isSent && <p>Sent</p>}
      <EmailInput label='이메일' name='email' value={value} onChange={setValue} />
      <Button onClick={handleSend} />
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
