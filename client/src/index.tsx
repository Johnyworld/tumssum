import { h, render } from 'preact';
import { Suspense } from 'preact/compat';
import { Provider } from 'react-redux';
import App from './components/App';
import 'preact/debug';
import './style/index.scss';
import axios from 'axios';
import { store } from '~utils/redux/store';
import './i18n'

const KAKAO_JS_KEY = process.env.KAKAO_JS_KEY;
const { Kakao } = window as any;
Kakao.init(KAKAO_JS_KEY);
Kakao.isInitialized()

axios.interceptors.response.use(function (response) {
  return response.data;
})

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PROXY : '';

const app = document.getElementById('app');
render(
  <Suspense fallback={<h3>Loading...</h3>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
, app!);

if ('serviceWorker' in navigator) {
  if ( process.env.NODE_ENV === 'production' ) {
    window.addEventListener('load', () => {
      registerSW();
    })
  }
}

const registerSW = async () => {
  try {
    await navigator.serviceWorker.register('./sw.ts', {
      scope: '/'
    });
  } catch {
    console.log('SW registration failed');
  }
}