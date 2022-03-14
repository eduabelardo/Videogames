import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	getVideogames,
	getGenres,
	orderGames,
	orderByGenre,
} from '../../Actions/Index.js';
import Card from '../Card/Card';
import './ContCards.css';

export default function ContCards() {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [videogamesPerPage] = useState(15);
	let videogames = useSelector((state) => state.videogames);
	const genres = useSelector((state) => state.allGenres);
	let respalData = useSelector((state) => state.respaldData);

	useEffect(() => {
		dispatch(getVideogames());
		dispatch(getGenres());
		setPage(1);
	}, [dispatch]);

	//filtrado

	const [order, setOrder] = useState('null');
	const [genresOrder, setGenresOrder] = useState('null');

	useEffect(() => {
		setPage(1);
	}, [order, genresOrder]);

	function selectByGenre(e) {
		setGenresOrder(e);
		dispatch(orderByGenre(e));
		setPage(1);
	}

	function orderAll(e) {
		setOrder(e);
		dispatch(orderGames(e));
		setPage(1);
	}

	//Paginado
	let init = (page - 1) * videogamesPerPage;
	let end = page * videogamesPerPage;

	return (
		<div className='cardsContainer'>
			<div className='Pagination'>
				<button
					className='button1'
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
				>
					Previous Page
				</button>
				<span className='page'>{`Page ${page}`}</span>
				<button
					className='button2'
					onClick={() => setPage(page + 1)}
					disabled={page === 6}
				>
					Next Page
				</button>
			</div>
			<div className='buttonsContainer'>
				<select
					className='buttonSelect'
					onChange={(e) => orderAll(e.target.value)}
				>
					<option value='null'>Alphabetic Order</option>
					<option value='asc-alf'>A-Z</option>
					<option value='desc-alf'>Z-A</option>
				</select>
				<select
					className='buttonSelect'
					onChange={(e) => orderAll(e.target.value)}
				>
					<option value='null'>Rating Order</option>
					<option value='asc-rai'>Higher raiting</option>
					<option value='desc-rai'>Lower raiting</option>
				</select>
				<select
					className='buttonSelect'
					onChange={(e) => selectByGenre(e.target.value)}
				>
					<option value='null'>Genres</option>
					{genres
						? genres
								.sort((a, b) => {
									if (a.name > b.name) return 1;
									if (b.name > a.name) return -1;
									return 0;
								})
								.map((e) => {
									return (
										<option key={e.id} value={e.name}>
											{e.name}
										</option>
									);
								})
						: []}
				</select>
			</div>
			<div>
				<div className='Cards'>
					{videogames
						? videogames
								.slice(init, end)
								.map((v) => (
									<Card
										key={v.id}
										id={v.id}
										name={v.name}
										description={v.descriptions}
										released={v.released}
										rating={v.rating}
										image={v.image}
										genres={v.genres}
									/>
								))
						: respalData
								.slice(init, end)
								.map((v) => (
									<Card
										key={v.id}
										id={v.id}
										name={v.name}
										description={v.descriptions}
										released={v.released}
										rating={v.rating}
										image={v.image}
										genres={v.genres}
									/>
								))}
				</div>
			</div>
		</div>
	);
}
