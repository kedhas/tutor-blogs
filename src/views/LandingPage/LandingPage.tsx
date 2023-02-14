import React, { Component } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import courses from './courses.json'


interface LandingPropsProps {
	data: LandingCardData[];
}

interface LandingCardData {
	title: string;
	description: string;
	image: string;
	route: string
}

function LandingProps() {
	const navigate = useNavigate();

	return (
		<div className="card-grid">
			{courses.map(course => (
				<div className="card" key={course.route} onClick={() => {
					navigate(`/${course.route}`)
				}}>
					<img src={course.image} alt={course.title} />
					<h2>{course.title}</h2>
					<p>{course.description}</p>
				</div>))}
		</div>
	);
}

export default LandingProps;
