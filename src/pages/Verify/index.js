import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./index.css";

const Verify = () => {
	const { id } = useParams();
	const [verified, setVerified] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const sendVerification = async () => {
			try {
				const data = { id };
				const res = await axios.put(`/users/verify`, data);
				setVerified(true);
				setMessage("Verification successful!");
			} catch (e) {
				setVerified(false);
				setMessage(e.message);
			}
		};
		sendVerification();
	}, [id]);

	return (
		<div className="container">
			<h1>Verification</h1>
			<span style={{ color: verified ? "green" : "red" }}>{message}</span>
			{verified && (
				<p>
					You may now <Link to="/login">log in</Link>.
				</p>
			)}
		</div>
	);
};

export default Verify;
