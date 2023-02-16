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
	const [activeItem, setActiveItem] = useState<any>(null);
	const navigate = useNavigate();

	console.log('length ', menuItems.length)

	return (
		<div className="menu">
			{!!menuItems?.length && menuItems.map((topic) => (
				<div key={topic.title}>
					{topic.fileName ? <div className="heading1-link" onClick={() => {
						setActiveItem(topic);
						navigate(`/${course}/${topic.fileName}`)
					}}>{topic.title}</div>
						: <div className="heading1-nolink">{topic.title}</div>}

					{!!topic?.subTitles?.length && topic.subTitles.map((subTopic: any) => (
						<>
							<div
								key={subTopic.fileName}
								className={`heading2-link ${activeItem === subTopic ? "active" : ""
									}`}
								onClick={() => {
									setActiveItem(subTopic);
									navigate(`/${course}/${subTopic.fileName}`)
								}}
							>
								{subTopic.displayName}
							</div>
							<br />
						</>
					))}
				</div>
			))}
		</div>
	);
}

export default LeftMenu;
