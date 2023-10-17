import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";
import "./scss/main.css";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

// import App from './Tutorial-Hooks/UseContext01-App'
// import App from './Tutorial-Hooks/UseContext02-App'
// import App from './Tutorial-Hooks/UseContext03-App'
// import App from './Tutorial-Hooks/useMemo1-App'
// import App from './Tutorial-Hooks/useEffect1-App'
// import App from './Tutorial-Hooks/useEffect2-App'
// import App from './app01-counter/App';
// import App from './app02-vidly/App';
// import App from './app03-props-state/App';
// import App from './app04-lifting-states/App';
// import App from './app05-lifecycle/App' // see inspector console
// import App from './app06-vidly-Like/App'
// import App from './app06-vidly-pagination/App'
// import App from "./app07-router-app/App";
// import App from "./app08-routes-link/App";
import App from "./app09-Form/App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
