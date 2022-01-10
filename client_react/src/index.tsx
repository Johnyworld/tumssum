import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from '~/store';
import { Provider } from 'react-redux';
import './style/index.scss';
import axios from 'axios';


const proxy = process.env.REACT_APP_PROXY || '';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? proxy : '';
axios.interceptors.response.use(function (response) {
  return response.data;
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
