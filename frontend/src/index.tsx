import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "../src/App";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
   <BrowserRouter basename={process.env.PUBLIC_URL}>
     <App />
   </BrowserRouter>
  </React.StrictMode>
);