import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import Todos from './Container/main';
import reportWebVitals from './reportWebVitals';
import './styles.css';

ReactDOM.render(
  <Todos />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
