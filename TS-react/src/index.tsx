import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// ************************************
// IMPORT APP FROM SPECIFIC APP FILE
// ************************************
// import App from './App01';
// import App from './App02';
// import App from './App03';
// import App from './App04';
import App from './App05-hooks'


// ************************************

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
