import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVideogames} from '../../Actions/Index.js';
import Card from '../Card/Card';
import './ContCards.css';

export default function ContCards() {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [videogamesPerPage] = useState(15);
	const videogames = useSelector((state) => state.videogames);

	useEffect(() => {
		dispatch(getVideogames());
	}, [dispatch]);

	useEffect(() => {
		setPage(1);
	}, [dispatch, videogames]);

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

			<div className='Cards'>
				<div>
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
						: 'Estoy cargando...'}
				</div>
			</div>
		</div>
	);
}
