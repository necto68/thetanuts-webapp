import ReactGA from "react-ga4";
import React from "react";
import ReactDOM from "react-dom";

import { googleAnalyticsId } from "./features/app/constants";
import { App } from "./features/app/components";

ReactGA.initialize(googleAnalyticsId);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
