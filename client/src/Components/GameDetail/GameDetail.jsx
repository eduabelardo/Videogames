import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getGameById} from '../../Actions/Index';
import './GameDetail.css';
export default function GameDetail(data) {
	const {id} = data.match.params;

	const dispatch = useDispatch();
	const game = useSelector((state) => state.gameDetail);

	useEffect(() => {
		dispatch(getGameById(id));
	}, [dispatch, id]);

	return (
		<div className='container'>
			<div className='image'>
				<img width='400px' height='250px' src={game.image} alt='Game' />
			</div>
			<div>
				<h3>{game.name}</h3>
				<p>Released: {game.released}</p>
				<p>Rating: {game.rating}</p>
				<p>Genres: {game.genres}</p>
				<p>You can play it at: {game.platforms}</p>
				<p className='description'>Description: {game.description}</p>
			</div>
		</div>
	);
}
