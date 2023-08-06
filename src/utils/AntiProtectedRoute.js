import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userData } from "./store";

const AntiProtectedRoute = ({ children }) => {
	const user = useRecoilValue(userData);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate(-1);
		}
	}, [navigate, user]);

	return children;
};

export default AntiProtectedRoute;
