import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import axios from "axios";

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  composeWithDevTools()
);

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
