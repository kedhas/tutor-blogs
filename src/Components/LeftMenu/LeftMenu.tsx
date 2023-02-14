import React, { useState } from 'react';
import './LeftMenu.css';

function LeftMenu() {
	const [menuOpen, setMenuOpen] = useState(false);

	function toggleMenu() {
		setMenuOpen(!menuOpen);
	}

	return (
		<div className="left-menu">
			<button className="menu-toggle" onClick={toggleMenu}>
				{menuOpen ? 'Close menu' : 'Open menu'}
			</button>
			<div className={`menu-items ${menuOpen ? 'open' : ''}`}>
				<ul>
					<li><a href="#">Menu item 1</a></li>
					<li><a href="#">Menu item 2</a></li>
					<li><a href="#">Menu item 3</a></li>
				</ul>
			</div>
		</div>
	);
}

export default LeftMenu;
