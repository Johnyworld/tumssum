import { h, render } from 'preact';
import { Provider as ReduxProvider } from 'react-redux';
import App from './components/app';
import 'preact/debug';
import './style/index.scss';
import { store } from './store';

import axios from 'axios';
import Provider from './utils/context/provider';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PROXY : '';

const app = document.getElementById('app');
render(
  <ReduxProvider store={store}>
    <Provider>
      <App />
    </Provider>
  </ReduxProvider>
, app!);
