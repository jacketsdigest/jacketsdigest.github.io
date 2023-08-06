import { useEffect, useState } from "react";

import "./index.css";

const LogoutBanner = () => {
	const [showLogoutBanner, setShowLogoutBanner] = useState(true);

	useEffect(() => {
		const show = localStorage.getItem("showLogoutBanner");
		setShowLogoutBanner(!show || show === "true");
	}, []);

	const hideLogoutBanner = () => {
		setShowLogoutBanner(false);
		localStorage.setItem("showLogoutBanner", false);
	};

	return (
		<>
			{showLogoutBanner && (
				<div className="logout-banner">
					<p className="logout-text">You have been logged out.</p>
					<button
						className="btn btn-navy logout-btn"
						onClick={hideLogoutBanner}
					>
						Okay
					</button>
				</div>
			)}
		</>
	);
};

export default LogoutBanner;
