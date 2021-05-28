import { h, render } from 'preact';
import { Provider } from 'react-redux';
import App from './components/app';
import 'preact/debug';
import './style/index.scss';
import { store } from './store';

import axios from 'axios';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PROXY : '';

const app = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>
, app!);
