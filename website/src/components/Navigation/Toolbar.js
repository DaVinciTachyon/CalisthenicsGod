import React, { useState } from 'react';
import './Toolbar.css';
import { Link } from 'react-router-dom';

function Toolbar() {
	const [
		showMenu,
		setMenu
	] = useState(false);

	function toggleMenu() {
		setMenu(!showMenu);
	}

	return (
		<nav>
			<div className="hamburger" onClick={toggleMenu}>
				<div className="line" />
				<div className="line" />
				<div className="line" />
			</div>
			<ul className={showMenu ? 'open' : ''} onClick={toggleMenu}>
				<Link to="/">
					<li>Home Page</li>
				</Link>
				<Link to="/nutrientTracker">
					<li>Nutrient Tracker</li>
				</Link>
				<Link to="/measurementTracker">
					<li>Measurement Tracker</li>
				</Link>
				<Link to="/userProfile">
					<li>User Profile</li>
				</Link>
				<li onClick={logOut}>Log Out</li>
			</ul>
		</nav>
	);
}

function logOut() {
	localStorage.removeItem('authToken');
	window.location.reload(false);
}

export default Toolbar;
