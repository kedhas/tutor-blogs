import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '../../models/Models';
import './LeftMenu.css';

interface LeftMenuProps {
	menuItems: Lesson[],
	course: string
}
function LeftMenu(props: LeftMenuProps) {
	const { menuItems, course } = props;
	const [activeItem, setActiveItem] = useState(null);
	const navigate = useNavigate();

	console.log('length ', menuItems.length)

	return (
		<div className="menu">
			{!!menuItems?.length && menuItems.map((topic) => (
				<div key={topic.title}>
					<div className="heading" onClick={() => navigate(`/${course}/${topic.fileName}`)}>{topic.title}</div>
					{!!topic?.subTitles?.length && topic.subTitles.map((subTopic: any) => (
						<div
							key={subTopic.fileName}
							className={`subheading ${activeItem === subTopic ? "active" : ""
								}`}
							onClick={() => navigate(`/${course}/${subTopic.fileName}`)}
						>
							{subTopic.displayName}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default LeftMenu;
