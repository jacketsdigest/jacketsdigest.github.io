import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { userData } from "../../utils/store";
import "./index.css";

const Account = () => {
	const [user, setUser] = useRecoilState(userData);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		} else {
			const curToken = localStorage.getItem("Authorization");

			const getUserData = async () => {
				const userDataRes = await axios.get("/users/getUser", {
					headers: {
						Authorization: curToken,
					},
				});

				if (userDataRes.status === 200) {
					setUser(userDataRes.data);
				}
			};

			getUserData();
		}
	}, [navigate, setUser, user]);

	return (
		<>
			{user && (
				<div className="container">
					<h1>My Account</h1>
					<input
						type="text"
						className="account-input"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input
						type="text"
						className="account-input"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<input
						type="email"
						className="account-input"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						className="account-input"
						placeholder="Old Password"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
					<input
						type="password"
						className="account-input"
						placeholder="New Password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<button className="btn btn-navy save-account-btn">Save</button>
				</div>
			)}
		</>
	);
};

export default Account;
