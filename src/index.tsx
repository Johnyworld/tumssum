import { h, render } from 'preact';
import App from './components/app';
import './style/index.scss';

const app = document.getElementById('app');
render(<App />, app!);
