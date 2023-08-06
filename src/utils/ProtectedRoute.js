import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userData } from "./store";

const ProtectedRoute = ({ children }) => {
	const [user, setUser] = useRecoilState(userData);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user]);

	return children;
};

export default ProtectedRoute;
