import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from './utils/reduxHooks';
import RenderConfirm from './RenderConfirm';
import RenderToast from './RenderToast';
import routes from './utils/routes';

import IndexPage from '~/pages';
import LoginPage from '~/pages/login';
import RegisterPage from '~/pages/register';
import ConfirmPage from '~/pages/confirm';
import CategoryPage from './pages/category';
import BankPage from './pages/bank';
import SettingsPage from './pages/settings';

import { getAccounts } from './stores/accountSlice';
import { getBanks } from './stores/bankSlice';

const AppLoggedIn: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
    dispatch(getBanks());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={routes.home} element={<IndexPage />} />
      <Route path={routes.category} element={<CategoryPage />} />
      <Route path={routes.bank} element={<BankPage />} />
      <Route path={routes.settings} element={<SettingsPage />} />
    </Routes>
  );
};

const AppNotLoggedIn: React.FC = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<LoginPage />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
      <Route path={routes.confirm} element={<ConfirmPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const userId = useSelector((state) => state.user.userInfo?.id);
  const isLoggedIn = !!userId;
  return (
    <BrowserRouter>
      {!isLoggedIn && <AppNotLoggedIn />}
      {isLoggedIn && <AppLoggedIn />}
      <RenderConfirm />
      <RenderToast />
    </BrowserRouter>
  );
};

export default App;
