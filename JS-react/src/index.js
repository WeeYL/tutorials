import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

// import App from './Tutorial-Hooks/useEffect-App';
// import App from './Tutorial-Hooks/useRef-App';
// import App from './Tutorial-Hooks/UseContext01-App';
// import App from './Tutorial-Hooks/UseContext02-App';
// import App from './Tutorial-Hooks/UseContext03-App';
// import App from './Tutorial-CSS/App-tutorial-CSS'
// import App from './Tutorial-Basic/lifecycle'
// import App from './Tutorial-Basic/counters'
// import App from './Tutorial-Basic/component1-hello-world'
// import { CounterFC } from "./Tutorial-Basic/BasicFunctionalComponent";
// import { ToggleColor } from "./Tutorial-Basic/BasicFunctionalComponent";
// import App from './vidly/App-Vidly'
import App from "./basic-Front-Back/client/app"


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);


reportWebVitals();
