import React from 'react';
import './CreateGame.css';

export default function CreateGame() {
	let [input, setInput] = React.useState({
		name: '',
		description: '',
		released: '',
		raiting: 0,
		image: '',
		genres: [],
		platforms: [],
	});

	let handleChange = (e) => {
		e.preventDefault();
		setInput((prev) => ({...prev, [e.target.name]: e.target.value}));
	};
	let handleSubmit = (e) => {
		e.preventDefault();
		setInput({
			name: '',
			description: '',
			released: '',
			raiting: 0,
			image: '',
			genres: [],
			platforms: [],
		});
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
					<label>Raiting </label>
					<input
						className='input'
						type='number'
						name={'raiting'}
						value={input.raiting}
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
					<input className='submit' type='submit' value={'Create Game'} />
				</div>
			</form>
		</div>
	);
}
