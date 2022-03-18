import React, {useState} from 'react';
import './CreateGame.css';
import {createGame} from '../../Actions/Index';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function CreateGame() {
	const dispatch = useDispatch();
	const genres = useSelector((state) => state.allGenres);
	const history = useHistory();

	//Estados para validacion
	let [nameError, setNameError] = useState('');
	let [descriptError, setDescriptError] = useState('');
	let [realisedtError, setRealisedtError] = useState('');
	let [ratingError, setRatingError] = useState('');
	let [imageError, setImageError] = useState('');
	let [platformsError, setPlatformsError] = useState('');
	let [genressError, setGenressError] = useState('');
	let [gameCreated, setGameCreated] = useState('');

	let [genresId, setGenresId] = useState([]);
	let [input, setInput] = useState({
		name: '',
		description: '',
		released: '',
		rating: 0,
		image: '',
		platforms: '',
	});

	//Funcion para validacion
	let validateDates = (e) => {
		if (e.target.name === 'name') {
			if (e.target.value.length < 2) {
				<span>{setNameError('You should whrite a name')}</span>;
			} else {
				setNameError('');
			}
		}
		if (e.target.name === 'description') {
			if (e.target.value.length < 30 || e.target.value.length === '') {
				<span>{setDescriptError('You should whrite a description')}</span>;
			} else {
				setDescriptError('');
			}
		}
		if (e.target.name === 'realised') {
			if (
				!/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/.test(
					e.target.value
				) ||
				e.target.value.length === ''
			) {
				<span>{setRealisedtError('You should choose a realised date')}</span>;
			} else {
				setRealisedtError('');
			}
		}
		if (e.target.name === 'rating') {
			if (!/[0-5]/.test(e.target.value) || e.target.value.length === '') {
				<span>{setRatingError('You should rate your game from 0 to 5')}</span>;
			} else {
				setRatingError('');
			}
		}
		if (e.target.name === 'image') {
			if (
				!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(e.target.value) ||
				e.target.value.length === ''
			) {
				<span>{setImageError('You should use a valid URL')}</span>;
			} else {
				setImageError('');
			}
		}
		if (e.target.name === 'platforms') {
			if (e.target.value.length < 5 || e.target.value.length === '') {
				<span>
					{setPlatformsError('You should whrite at least one platform')}
				</span>;
			} else {
				setPlatformsError('');
			}
		}
		if (e.target.value === 'default') {
			if (e.target.value === 'default') {
				<span>{setGenressError('You should choose a genre')}</span>;
			} else {
				setGenressError('');
			}
		} else {
			setGenressError('');
		}
	};

	let handleChange = (e) => {
		e.preventDefault();
		setInput((prev) => ({...prev, [e.target.name]: e.target.value}));
		validateDates(e);
	};

	let handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			createGame({
				name: input.name,
				description: input.description,
				released: input.released,
				rating: input.rating,
				image: input.image,
				platforms: input.platforms,
				genres: genresId,
			})
		);
		setInput({
			name: '',
			description: '',
			released: '',
			rating: 0,
			image: '',
			platforms: '',
		});
		setGenresId([]);
		setGameCreated('Game created correctly!');
		setTimeout(() => {
			history.push('/home');
		}, 3000);
	};
	let handleGenres = (e) => {
		e.preventDefault();
		setGenresId([...genresId, parseInt(e.target.value)]);
		validateDates(e);
	};

	return (
		<div className='form-container'>
			<div className='form'>
				<div className='title'>
					<h1>CREATE YOUR OWN GAME</h1>
					<h3>Complete the next form</h3>
				</div>
				<form autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
					<div className='formBox'>
						<div className='inputleft'>
							<input
								placeholder='Name'
								className='inputBox'
								type='text'
								name={'name'}
								value={input.name}
								onChange={(e) => handleChange(e)}
							/>
							{!nameError ? null : (
								<span style={{color: 'red'}}> {nameError} </span>
							)}

							<input
								placeholder='Description'
								className='inputBox'
								type='text'
								name={'description'}
								value={input.description}
								onChange={(e) => handleChange(e)}
							/>
							{!descriptError ? null : (
								<span style={{color: 'red'}}> {descriptError} </span>
							)}

							<input
								placeholder='Raiting'
								className='inputBox'
								type='number'
								name={'rating'}
								value={input.rating}
								onChange={(e) => handleChange(e)}
							/>
							{!ratingError ? null : (
								<span style={{color: 'red'}}> {ratingError} </span>
							)}
							<>
								<select
									className='genresButton'
									onChange={(e) => handleGenres(e)}
								>
									<option value='default'>Genres</option>
									{genres
										? genres
												.sort((a, b) => {
													if (a.name > b.name) return 1;
													if (b.name > a.name) return -1;
													return 0;
												})
												.map((e) => {
													return (
														<option key={e.id} value={e.id}>
															{e.name}
														</option>
													);
												})
										: []}
								</select>

								{!genressError ? null : (
									<span style={{color: 'red'}}> {genressError} </span>
								)}
							</>
						</div>
						<div className='inputright'>
							<input
								placeholder='Image URL'
								className='inputBox'
								type='text'
								name={'image'}
								value={input.image}
								onChange={(e) => handleChange(e)}
							/>
							{!imageError ? null : (
								<span style={{color: 'red'}}> {imageError} </span>
							)}

							<input
								placeholder='Platforms'
								className='inputBox'
								type='text'
								name={'platforms'}
								value={input.platforms}
								onChange={(e) => handleChange(e)}
							/>
							{!platformsError ? null : (
								<span style={{color: 'red'}}> {platformsError} </span>
							)}

							<input
								placeholder='Released'
								className='inputBox'
								type='date'
								name={'released'}
								value={input.released}
								onChange={(e) => handleChange(e)}
							/>
							{!realisedtError ? null : (
								<span style={{color: 'red'}}> {realisedtError} </span>
							)}
						</div>
					</div>
					<div className='genresAndsubmit'>
						<input
							action='/home'
							className='submit'
							type='submit'
							disabled={
								nameError !== '' ||
								descriptError !== '' ||
								realisedtError !== '' ||
								ratingError !== '' ||
								imageError !== '' ||
								platformsError !== '' ||
								genressError !== ''
							}
						/>
						{!gameCreated ? null : (
							<span style={{color: 'withe'}}> {gameCreated} </span>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
