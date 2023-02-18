import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import techStacks from '../../data/lessons.json'
import { TechStack } from '../../models/Models';


function LandingProps() {
	const navigate = useNavigate();
	console.log(techStacks)
	return (
		<div className='main-page'>
			<div className='top-image'>
				<span className='kedhas'>KedHas</span>
			</div>
			<div>
				{(techStacks as TechStack[]).map(techStack =>
				(<>
					<div>
						<hr />
						<h2 className='category-title'>{techStack.catagory}</h2>
						<hr />
					</div>
					<div className="card-grid">
						{
							techStack.techs.map(tech => (
								<div className="card" key={tech.route} onClick={() => {
									navigate(`/${tech.route}`)
								}}>
									<img className='lesson-card-image' src={tech.image} alt={tech.title} />
									<h2>{tech.title}</h2>
									{/* <p>{lesson.description}</p> */}
								</div>))
						}
					</div>
				</>)
				)}
			</div>
		</div>
	);
}

export default LandingProps;
