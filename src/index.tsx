import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga4";

import { App } from "./features/app/components";

ReactGA.initialize("G-PWJN1DH7GM");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
