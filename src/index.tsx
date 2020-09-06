import React from 'react';
//@ts-ignore
import ReactDOM from 'react-dom';
import App from './components/App';
import '@vladocar/basic.css/css/basic.css';
import './style.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

