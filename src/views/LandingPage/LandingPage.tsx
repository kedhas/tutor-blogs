import React, { Component, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import lessons from '../../data/lessons.json'


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
			{lessons.map(lesson => (
				<div className="card" key={lesson.route} onClick={() => {
					navigate(`/${lesson.route}`)
				}}>
					<img src={lesson.image} alt={lesson.title} />
					<h2>{lesson.title}</h2>
					<p>{lesson.description}</p>
				</div>))}
		</div>
	);
}

export default LandingProps;
