import {GET_VIDEOGAMES, SEARCH_VIDEOGAMES, GET_GAME_BYID} from './Variables';
import axios from 'axios';

export function getVideogames(page, videogamesPerPage) {
	return async function (dispatch) {
		try {
			const result = await axios('http://localhost:3001/videogames');

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
			const result = await axios(
				`http://localhost:3001/videogames?name=${name}`
			);
			return dispatch({type: SEARCH_VIDEOGAMES, payload: result.data});
		} catch (error) {
			console.log(error);
		}
	};
}
export function getGameById(id) {
	return async function (dispatch) {
		try {
			const result = await axios(`http://localhost:3001/videogames/${id}`);

			return dispatch({type: GET_GAME_BYID, payload: result.data});
		} catch (error) {
			console.log(error);
		}
	};
}
