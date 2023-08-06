import { useState } from "react";

import Signup from "../../components/Signup";
import Login from "../../components/Login";

import "./index.css";

const Auth = () => {
	const [curTab, setCurTab] = useState(0);

	return (
		<div className="container">
			<h1>Login</h1>
			{/* <div className="card"> */}
			<div className="auth-tabs">
				<button
					className={`auth-tab btn-light text-large ${
						curTab === 0 ? "auth-tab-active" : ""
					}`}
					onClick={() => setCurTab(0)}
				>
					Log In
				</button>
				<button
					className={`auth-tab btn-light text-large ${
						curTab === 1 ? "auth-tab-active" : ""
					}`}
					onClick={() => setCurTab(1)}
				>
					Sign Up
				</button>
			</div>
			{curTab === 0 ? <Login /> : <Signup />}
		</div>
		// </div>
	);
};

export default Auth;
