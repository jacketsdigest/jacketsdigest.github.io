import { useState } from "react";
import axios from "axios";

const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState("");

	const successText =
		"Your account was successfully created. Please check your email for a verification link.";
	const failureText =
		"There was a problem creating your account. Please try again later.";

	const signUp = async () => {
		setSubmitted(true);

		const res = await axios.post("/users/createUser", {
			firstName,
			lastName,
			email,
			password,
		});

		if (res.status === 201) {
			setSuccess(true);
			setMessage(successText);
		} else {
			setSuccess(false);
			setMessage(failureText);
		}
	};

	const resendVerification = async () => {
		const res = await axios.post("/users/resendVerification", { email });

		if (res.status === 200) {
			setMessage(successText);
		} else {
			setMessage(failureText);
		}
	};

	return (
		<div className="auth-form">
			<input
				type="text"
				className="auth-input"
				placeholder="First Name"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value.trim())}
			/>
			<input
				type="text"
				className="auth-input"
				placeholder="Last Name"
				value={lastName}
				onChange={(e) => setLastName(e.target.value.trim())}
			/>
			<input
				type="email"
				className="auth-input"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value.trim())}
			/>
			<input
				type="password"
				className="auth-input"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value.trim())}
			/>
			<button className="auth-button btn-navy" onClick={signUp}>
				Sign Up
			</button>
			{submitted && (
				<div className="submitted-alert">
					<p>{message}</p>
					{success && (
						<p>
							Didn't receive a confirmation email?&nbsp;
							<button
								className="btn btn-link text-navy text-underline"
								onClick={resendVerification}
							>
								Click here
							</button>{" "}
							to resend it.
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Signup;
