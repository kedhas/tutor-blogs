import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
	return (
		<div className="header">
			<div className="header-left">
				{/* <img src="logo.png" alt="Logo" className="logo" /> */}
				<Link to={`/`}>Home</Link>
			</div>
			<div className="header-middle">
				<input type="text" placeholder="Search" className="search-bar" />
			</div>
			<div className="header-right">
				<button className="menu-toggle">
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>
	);
}

export default Header;
