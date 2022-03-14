import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {getVideogames, searchVideogames} from '../../Actions/Index';
import './NavBar.css';

export default function NavBar() {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	function handleName(data) {
		dispatch(searchVideogames(name));
		data.preventDefault();
		setName(data.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		setName('');
	}
	function handleGetAllGames(e) {
		e.preventDefault();

		dispatch(getVideogames());
	}

	return (
		<div className='navBar'>
			<div className='home' onClick={(e) => handleGetAllGames(e)}>
				<NavLink className='Link' to='/home'>
					<h3>Home</h3>
				</NavLink>
			</div>

			<div className='createGame'>
				<NavLink className='Link' to='/createGame'>
					<h3>Create Game</h3>
				</NavLink>
			</div>
			<div className='aboutMe'>
				<NavLink className='Link' to='/aboutMe'>
					<h3>About me</h3>
				</NavLink>
			</div>
			<div className='searchbar'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Search videogames'
						type='text'
					></input>

					<button name='search' type='submit' onClick={(e) => handleName(e)}>
						{' '}
						Search{' '}
					</button>
				</form>
			</div>
		</div>
	);
}
