import React from 'react';

import {Link} from 'react-router-dom';
import './Card.css';

export default function Card(data) {
	return (
		<div className='card'>
			<img
				className='img'
				width='250px'
				height='150px'
				src={data.image}
				alt={data.name}
			/>

			<div className='textCard'>
				<div className='nameGenres'>
					<div className='name'>{data.name}</div>
					<div className='genres'>{data.genres.toString()}</div>
				</div>
				<div className='rating'>
					<div className='rating'>{data.rating}</div>
				</div>
			</div>
			<Link to={`/home/${data.id}`}>
				<button className='button'>See More!</button>
			</Link>
		</div>
	);
}
