import { h, render } from 'preact';
import App from './components/app';
import './style/index.scss';

import axios from 'axios';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PROXY : '';

const app = document.getElementById('app');
render(<App />, app!);
