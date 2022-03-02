const {Router} = require('express');
const {Videogame, Generos} = require('../db');
const axios = require('axios');
const api_key = process.env.API_KEY;

const router = Router();
const getVideogames = async (req, res, next) => {
	const {name} = req.query;
	try {
		let apiGames = await axios.get(
			`https://api.rawg.io/api/games?key=${api_key}`
		);
		apiGames = apiGames.data.results.map((game) => {
			return {
				id: game.id,
				name: game.name,
				rating: game.rating[0].title,
				description: game.name,
				source: 'API',
				released: game.released,
				plataforms: game.plataforms,
				image: game.background_image,
				genres: game.genres,
			};
		});
		let dbGames = await Videogame.findAll({include: Generos});
		let games = [...dbGames, ...apiGames];
		if (name) {
			if (games.includes(name)) {
				res.json(games[name]);
			} else {
				res.send('No se encontro el juego');
			}
		} else {
			res.json(games);
		}
	} catch (error) {
		next(error);
	}
};
const createVideogame = async (req, res, next) => {};

module.exports = {
	getVideogames,
	createVideogame,
};
