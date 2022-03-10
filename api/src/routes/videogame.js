const {Router} = require('express');
const {Videogame, Generos} = require('../db');
const axios = require('axios');
const api_key = process.env.API_KEY;
const {v4: v4, version} = require('uuid');
const db = require('../db');
const router = Router();
const getVideogames = async (req, res, next) => {
	const {name} = req.query;

	try {
		let apiGames = [];
		for (let i = 1; i < 6; i++) {
			var response = await axios.get(
				`https://api.rawg.io/api/games?key=${api_key}&page=${[i]}`
			);
			apiGames = [...apiGames, ...response.data.results];
		}

		apiGames = apiGames.map((game) => {
			return {
				id: game.id,
				name: game.name,
				rating: game.rating,
				source: 'API',
				released: game.released,
				platforms: game.platforms.map((e) => e.platform.name).join(', '),
				image: game.background_image,
				genres: game.genres.map(({name}) => name),
			};
		});
		let dbGames = await Videogame.findAll({
			include: [Generos],
		});
		console.log(dbGames);
		dbGames = await dbGames.map((d) => {
			return {
				id: d.id,
				name: d.name,
				rating: d.rating,
				source: 'DB',
				released: d.released,
				platforms: d.platforms,
				image: d.background_image,
				genres: d.generos.map((e) => e.name),
			};
		});
		let games = [...dbGames, ...apiGames];

		if (name) {
			const results = [];
			for (let i = 0; i < games.length; i++) {
				if (games[i].name.toLowerCase().includes(name.toLowerCase())) {
					results.push(games[i]);
				}
			}
			if (results.length > 0) {
				games = results.slice(0, 15);
			} else {
				return res.json({error: 'No se ha encontrado el juego'});
			}
		}
		res.json(games);
	} catch (error) {
		next(error);
	}
};
const createVideogame = async (req, res, next) => {
	const {name, description, released, rating, platforms, image, genres} =
		req.body;

	try {
		const newVideoGame = await Videogame.create({
			id: v4(),
			name,
			description,
			released,
			rating,
			platforms,
			image,
			genres,
		});
		genres.forEach(async (g) => {
			let genresGame = await Generos.findOne({where: {id: g}});
			await newVideoGame.addGeneros(genresGame);
		});
		res.json(newVideoGame);
	} catch (error) {
		next(error);
	}
};
const getVideogameById = async (req, res, next) => {
	const {idGame} = req.params;
	try {
		const dataApi = await axios.get(
			`https://api.rawg.io/api/games/${idGame}?key=${api_key}`
		);
		const {
			id,
			name,
			background_image,
			platforms,
			genres,
			rating,
			released,
			description_raw,
		} = dataApi.data;
		res.json({
			id,
			name,
			background_image,
			platforms: platforms.map((e) => e.platform.name).join(', '),
			genres: genres.map(({name}) => name).join(', '),
			rating,
			released,
			description: description_raw,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getVideogames,
	createVideogame,
	getVideogameById,
};
