import { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import {
	IoCloseOutline,
	IoMenuOutline,
	IoPersonCircleOutline,
} from "react-icons/io5";

import { userData } from "../../utils/store";
import "./index.css";

const Navbar = () => {
	const [user, setUser] = useRecoilState(userData);
	const setToken = useSetRecoilState(userData);
	const [navOpened, setNavOpened] = useState(false);
	const authDropdownRef = useRef(null);
	const [authDropdownOpened, setAuthDropdownOpened] = useState(false);
	const navigate = useNavigate();

	const iconSize = 35;

	useEffect(() => {
		document.addEventListener("click", handleAuthBlur, false);
		return () => {
			document.removeEventListener("click", handleAuthBlur, false);
		};
	}, []);

	const toggleNav = () => {
		setNavOpened(!navOpened);
	};

	const hideNav = () => {
		setNavOpened(false);
	};

	const toggleAuthDropdown = () => {
		setAuthDropdownOpened(!authDropdownOpened);
	};

	const handleAuthBlur = (event) => {
		if (
			authDropdownRef.current &&
			!authDropdownRef.current.contains(event.target)
		) {
			setAuthDropdownOpened(false);
		}
	};

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("Authorization");
		localStorage.removeItem("user");
		setUser(null);
		setToken("");
		toggleAuthDropdown();
		navigate("/login");
	};

	return (
		<nav className="navbar">
			{navOpened && (
				<ul className="nav-links">
					<li className="nav-item">
						<Link className="nav-link" to="/" onClick={hideNav}>
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/about" onClick={hideNav}>
							About
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/contact" onClick={hideNav}>
							Contact
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/read" onClick={hideNav}>
							Read
						</Link>
					</li>
				</ul>
			)}
			<div className="auth-menu" ref={authDropdownRef} onClick={hideNav}>
				{user ? (
					<button className="user-dropdown" onClick={toggleAuthDropdown}>
						<IoPersonCircleOutline className="text-gold" size={iconSize} />
					</button>
				) : (
					<Link className="nav-link login-link" to="/login">
						Login
					</Link>
				)}
			</div>
			<button className="nav-toggle" onClick={toggleNav}>
				{navOpened ? (
					<IoCloseOutline className="text-gold" size={iconSize} />
				) : (
					<IoMenuOutline className="text-gold" size={iconSize} />
				)}
			</button>
			{authDropdownOpened && (
				<ul className="auth-dropdown">
					<li className="auth-dropdown-item">
						<Link
							className="auth-dropdown-link"
							to="/my-account"
							onClick={toggleAuthDropdown}
						>
							My Account
						</Link>
					</li>
					<li className="auth-dropdown-item">
						<Link className="auth-dropdown-link" to="/submit">
							Submit a Joke
						</Link>
					</li>
					<li className="auth-dropdown-item">
						<Link className="auth-dropdown-link text-red" onClick={logout}>
							Logout
						</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
