import { Route } from "react-router";

// Components
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Verify from "../pages/Verify";
// import CookiesBanner from "../components/CookiesBanner";
import Account from "../pages/Account";
import SubmitJoke from "../pages/SubmitJoke";
import AntiProtectedRoute from "../utils/AntiProtectedRoute";
import ProtectedRoute from "../utils/ProtectedRoute";

export default (
	<Route>
		<Route path="/" element={<Home />} />
		<Route
			path="/login"
			element={
				<AntiProtectedRoute>
					<Auth />
				</AntiProtectedRoute>
			}
		/>
		<Route path="/verify/:id" element={<Verify />} />
		<Route
			path="/my-account"
			element={
				<ProtectedRoute>
					<Account />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/submit"
			element={
				<ProtectedRoute>
					<SubmitJoke />
				</ProtectedRoute>
			}
		/>
	</Route>
);
