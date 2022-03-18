import {
	GET_VIDEOGAMES,
	SEARCH_VIDEOGAMES,
	GET_GAME_BYID,
	GET_GENRES,
	ORDER_GAMES,
	ORDER_BY_GENRE,
	ORDER_BY_EXISTANCE,
} from './Variables';
import axios from 'axios';

export function getVideogames(page, videogamesPerPage) {
	return async function (dispatch) {
		try {
			const result = await axios('/videogames');

			return dispatch({
				type: GET_VIDEOGAMES,
				payload: result.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function searchVideogames(name) {
	return async function (dispatch) {
		try {
			const result = await axios(`/videogames?name=${name}`);
			return dispatch({type: SEARCH_VIDEOGAMES, payload: result.data});
		} catch (error) {
			console.log(error);
		}
	};
}
export function getGameById(id) {
	return async function (dispatch) {
		try {
			const result = await axios(`/videogames/${id}`);

			return dispatch({type: GET_GAME_BYID, payload: result.data});
		} catch (error) {
			console.log(error);
		}
	};
}
export function getGenres() {
	return async function (dispatch) {
		try {
			const result = await axios('/generos');
			return dispatch({type: GET_GENRES, payload: result.data});
		} catch (error) {
			console.log(error);
		}
	};
}
export function createGame(input) {
	return async function () {
		try {
			await axios.post('/videogame', input);
		} catch (error) {
			console.log(error);
		}
	};
}
export function orderGames(order) {
	return {type: ORDER_GAMES, payload: order};
}
export function orderByGenre(order) {
	return {type: ORDER_BY_GENRE, payload: order};
}
export function orderByExistance(order) {
	return {type: ORDER_BY_EXISTANCE, payload: order};
}
