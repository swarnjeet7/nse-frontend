import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";

let API_BASE_URL = "https://nse-stock-exchange.herokuapp.com";
if (process.env.NODE_ENV === "development") {
  API_BASE_URL = "http://localhost:8080";
}
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["Authorization"] =
  window.sessionStorage.getItem("auth");

axios.interceptors.request.use(
  (request) => {
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
