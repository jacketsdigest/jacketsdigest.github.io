import { useEffect, useState } from "react";

import "./index.css";

const CookiesBanner = () => {
	const [showCookiesBanner, setShowCookiesBanner] = useState(true);

	useEffect(() => {
		const show = localStorage.getItem("showCookiesBanner");
		setShowCookiesBanner(!show || show === "true");
	}, []);

	const hideCookiesBanner = () => {
		setShowCookiesBanner(false);
		localStorage.setItem("showCookiesBanner", false);
	};

	return (
		<>
			{showCookiesBanner && (
				<div className="cookies-banner">
					<p className="cookies-text">
						We only use strictly necessary cookies for authentication purposes.
					</p>
					<button
						className="btn btn-navy cookies-btn"
						onClick={hideCookiesBanner}
					>
						Okay
					</button>
				</div>
			)}
		</>
	);
};

export default CookiesBanner;
