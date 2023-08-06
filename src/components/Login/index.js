import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import { userData, userToken } from "../../utils/store";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const setUser = useSetRecoilState(userData);
	const setToken = useSetRecoilState(userToken);
	const [verified, setVerified] = useState(true);

	const logIn = async () => {
		setSubmitted(true);

		const res = await axios.post("/users/login", {
			email,
			password,
			rememberMe,
		});

		if (res.status === 200) {
			const userDataRes = await axios.get("/users/getUser", {
				headers: {
					Authorization: `Bearer ${res.data.token}`,
				},
			});

			setVerified(userDataRes.data.verified);

			if (userDataRes.data.verified) {
				localStorage.setItem("user", JSON.stringify(userDataRes.data));
				setUser(userDataRes.data);
				localStorage.setItem("Authorization", `Bearer ${res.data.token}`);
				setToken(res.data.token);
			}
		}
	};

	const resendVerification = async () => {
		await axios.post("/users/resendVerification", { email });
	};

	return (
		<div className="auth-form">
			<input
				type="email"
				className="auth-input"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				className="auth-input"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div className="checkbox-container">
				<input
					type="checkbox"
					id="rememberLogin"
					value={rememberMe}
					onChange={(e) => setRememberMe(!rememberMe)}
				/>
				<label htmlFor="rememberLogin">Remember me for 7 days.</label>
			</div>
			<button className="auth-button btn-navy" onClick={logIn}>
				Log In
			</button>
			{submitted && !verified && (
				<p>
					Please verify your account.
					<p>
						Didn't receive a confirmation email?&nbsp;
						<button
							className="btn-link text-navy text-underline"
							onClick={resendVerification}
						>
							Click here
						</button>{" "}
						to resend it.
					</p>
				</p>
			)}
		</div>
	);
};

export default Login;
