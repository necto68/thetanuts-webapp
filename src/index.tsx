import React from "react";
import ReactDOM from "react-dom";

import { App } from "./features/app/components";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
