import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userData } from "./store";

const AntiProtectedRoute = ({ children }) => {
	const [user, setUser] = useRecoilState(userData);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate(-1);
		}
	}, [user]);

	return children;
};

export default AntiProtectedRoute;
