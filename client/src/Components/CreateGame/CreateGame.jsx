import React, {useState} from 'react';
import './CreateGame.css';
import {createGame} from '../../Actions/Index';
import {useDispatch, useSelector} from 'react-redux';

export default function CreateGame() {
	const dispatch = useDispatch();
	const genres = useSelector((state) => state.allGenres);

	let [genresId, setGenresId] = useState([]);
	let [input, setInput] = useState({
		name: '',
		description: '',
		released: '',
		rating: 0,
		image: '',
		platforms: '',
	});

	let handleChange = (e) => {
		e.preventDefault();
		setInput((prev) => ({...prev, [e.target.name]: e.target.value}));
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
	};
	let handleGenres = (e) => {
		setGenresId([...genresId, parseInt(e.target.value)]);
		console.log(input);
		console.log(genresId);
	};

	return (
		<div className='form'>
			<h1>CREATE YOUR OWN GAME</h1>
			<h3>Complete the next form</h3>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label>Name </label>
					<input
						className='input'
						type='text'
						name={'name'}
						value={input.name}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Description </label>
					<input
						className='input'
						type='text'
						name={'description'}
						value={input.description}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Released </label>
					<input
						className='input'
						type='date'
						name={'released'}
						value={input.released}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Rating </label>
					<input
						className='input'
						type='number'
						name={'rating'}
						value={input.rating}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Image(URL) </label>
					<input
						className='input'
						type='text'
						name={'image'}
						value={input.image}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Platforms </label>
					<input
						className='input'
						type='text'
						name={'platforms'}
						value={input.platforms}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<select onChange={(e) => handleGenres(e)}>
					<option value='All'>Genres</option>
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
				<div>
					<input className='submit' type='submit' />
				</div>
			</form>
		</div>
	);
}
