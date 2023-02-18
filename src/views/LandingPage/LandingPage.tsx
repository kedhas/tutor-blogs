import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import lessons from '../../data/lessons.json'


function LandingProps() {
	const navigate = useNavigate();
	return (
		<div className='main-page'>
			<div className='top-image'>
				<span className='kedhas'>KedHas</span>
			</div>
			<div className="card-grid">
				{lessons.map(lesson => (
					<div className="card" key={lesson.route} onClick={() => {
						navigate(`/${lesson.route}`)
					}}>
						<img src={lesson.image} alt={lesson.title} />
						<h2>{lesson.title}</h2>
						<p>{lesson.description}</p>
					</div>))}
			</div>
		</div>
	);
}

export default LandingProps;
