import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "lib-flexible/flexible";
import "./index.css"; // 先引入 tailwindcss，否则会影响antd-m样式
import { ConfigProvider } from "antd-mobile";
// import enUS from "antd-mobile/es/locales/en-US";
import zhCN from "antd-mobile/es/locales/zh-CN";
import "./nextLocals";
import App from "./App";
import { saveParentAdress } from "./utils/url";

window.localStorage.setItem("changeLanguage", "cn");

const root = ReactDOM.createRoot(document.getElementById("root"));
saveParentAdress()
root.render(
  // <React.StrictMode>
    <Router>
      <ConfigProvider locale={zhCN} >
        <App />
      </ConfigProvider>
    </Router>
  // </React.StrictMode>
);
