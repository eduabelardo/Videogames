import {
	GET_VIDEOGAMES,
	SEARCH_VIDEOGAMES,
	GET_GAME_BYID,
} from '../Actions/Variables';
const initialState = {
	videogames: null,
	gameDetail: {},
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				videogames: action.payload,
			};
		case SEARCH_VIDEOGAMES:
			return {
				...state,
				videogames: action.payload,
			};
		case GET_GAME_BYID:
			return {
				...state,
				gameDetail: action.payload,
			};
		default:
			return {
				...state,
				searchVideogame: action.payload,
			};
	}
}
