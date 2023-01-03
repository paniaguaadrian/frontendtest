import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardAdmin from './components/BoardAdmin';

import { logout } from './slices/auth';

const App = () => {
	const [showAdminBoard, setShowAdminBoard] = useState(false);

	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const logOut = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	useEffect(() => {
		if (currentUser) {
			setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'));
		} else {
			setShowAdminBoard(false);
		}
	}, [currentUser]);

	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={'/'} className="navbar-brand">
						bezKoder
					</Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={'/home'} className="nav-link">
								Home
							</Link>
						</li>

						{showAdminBoard && (
							<li className="nav-item">
								<Link to={'/admin'} className="nav-link">
									Admin Board
								</Link>
							</li>
						)}

						{currentUser && (
							<li className="nav-item">
								<Link to={'/user'} className="nav-link">
									User
								</Link>
							</li>
						)}
					</div>

					{currentUser ? (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={'/profile'} className="nav-link">
									{currentUser.username}
								</Link>
							</li>
							<li className="nav-item">
								<a href="/login" className="nav-link" onClick={logOut}>
									LogOut
								</a>
							</li>
						</div>
					) : (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={'/login'} className="nav-link">
									Login
								</Link>
							</li>

							<li className="nav-item">
								<Link to={'/register'} className="nav-link">
									Sign Up
								</Link>
							</li>
						</div>
					)}
				</nav>

				<div className="container mt-3">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/user" element={<BoardUser />} />
						<Route path="/admin" element={<BoardAdmin />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;