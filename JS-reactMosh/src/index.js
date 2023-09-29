import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'; 
import 'font-awesome/css/font-awesome.css' 
import './index.css';
import "./scss/main.css";

import reportWebVitals from './reportWebVitals';

// import App from './app01-counter/App';
// import App from './app02-vidly/App';
import App from './app03-props-state/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
