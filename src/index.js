import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { RecoilRoot } from "recoil";
import { HashRouter as Router } from "react-router-dom";
import axios from "axios";

if (process.env.NODE_ENV === "development") {
	axios.defaults.baseURL = "http://10.0.0.232:5000";
} else {
	axios.defaults.baseURL = "https://jackets-digest.onrender.com";
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<RecoilRoot>
		<Router>
			<App />
		</Router>
	</RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
