import {
	GET_VIDEOGAMES,
	SEARCH_VIDEOGAMES,
	GET_GAME_BYID,
	GET_GENRES,
	ORDER_GAMES,
	ORDER_BY_GENRE,
	ORDER_BY_EXISTANCE,
} from '../Actions/Variables';
const initialState = {
	videogames: null,
	gameDetail: {},
	allGenres: [],
	respaldData: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				videogames: action.payload,
				respaldData: action.payload,
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
		case GET_GENRES:
			return {
				...state,
				allGenres: action.payload,
			};
		case ORDER_GAMES:
			let orderVideogames = [];

			if (action.payload === 'null') {
				orderVideogames = state.videogames;
			}

			if (action.payload === 'asc-alf') {
				orderVideogames = state.videogames.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
					return 0;
				});
			}
			if (action.payload === 'desc-alf') {
				orderVideogames = state.videogames.sort((a, b) => {
					if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
					if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
					return 0;
				});
			}
			if (action.payload === 'asc-rai') {
				orderVideogames = state.videogames.sort((a, b) => {
					if (b.rating > a.rating) return 1;
					if (a.rating > b.rating) return -1;
					return 0;
				});
			}
			if (action.payload === 'desc-rai') {
				orderVideogames = state.videogames.sort((a, b) => {
					if (a.rating > b.rating) return 1;
					if (b.rating > a.rating) return -1;
					return 0;
				});
			}

			return {
				...state,
				videogames: orderVideogames,
			};
		case ORDER_BY_GENRE:
			state.videogames = state.respaldData;
			let videogamesByGenre = state.videogames;
			if (action.payload === 'null') {
				videogamesByGenre = state.videogames;
			} else {
				videogamesByGenre = state.videogames.filter((element) =>
					element.genres.includes(action.payload)
				);
			}

			return {
				...state,
				videogames: videogamesByGenre,
			};

		case ORDER_BY_EXISTANCE:
			state.videogames = state.respaldData;
			let sourceVideogames = state.videogames;

			if (action.payload === 'null') {
				sourceVideogames = state.videogames;
			}

			if (action.payload === 'old-games') {
				sourceVideogames = state.videogames.filter(
					(element) => element.source === 'API'
				);
			}
			if (action.payload === 'new-games') {
				sourceVideogames = state.videogames.filter(
					(element) => element.source === 'DB'
				);
			}
			return {
				...state,
				videogames: sourceVideogames,
			};

		default:
			return {
				...state,
				searchVideogame: action.payload,
			};
	}
}
