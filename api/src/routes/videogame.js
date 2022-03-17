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
				genres: game.genres.map(({name}) => name).join(', '),
			};
		});
		let dbGames = await Videogame.findAll({
			include: [Generos],
		});

		dbGames = await dbGames.map((d) => {
			return {
				id: d.id,
				name: d.name,
				rating: d.rating,
				source: 'DB',
				released: d.released,
				platforms: d.platforms,
				image: d.image,
				genres: d.generos.map(({name}) => name).join(', '),
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
				return res.send(results);
			}
		}
		res.json(games);
	} catch (error) {
		next(error);
	}
};
const createVideogame = async (req, res, next) => {
	const {
		name,
		description,
		released,
		rating,
		source,
		platforms,
		image,
		genres,
	} = req.body;

	try {
		const newVideoGame = await Videogame.create({
			id: v4(),
			name,
			description,
			released,
			rating,
			source: 'DB',
			platforms,
			image,
			genres,
		});
		genres.forEach(async (g) => {
			let genresGame = await Generos.findOne({where: {id: g}});
			await newVideoGame.addGeneros(genresGame);
		});
		res.json(newVideoGame);
		console.log(newVideoGame);
	} catch (error) {
		next(error);
	}
};
const getVideogameById = async (req, res, next) => {
	const {idGame} = req.params;
	try {
		if (idGame.length > 5) {
			let dbGames = await Videogame.findAll({
				include: [Generos],
			});

			dbGames = await dbGames.find((v) => v.id === idGame);

			const obj = {
				id: dbGames.id,
				name: dbGames.name,
				rating: dbGames.rating,
				source: 'DB',
				released: dbGames.released,
				platforms: dbGames.platforms,
				image: dbGames.image,
				genres: dbGames.generos.map((e) => e.name).join(', '),
				description: dbGames.description,
			};

			res.json(obj);
		} else {
			const dataApi = await axios.get(
				`https://api.rawg.io/api/games/${idGame}?key=${api_key}`
			);

			res.json({
				id: dataApi.data.id,
				name: dataApi.data.name,
				image: dataApi.data.background_image,
				platforms: dataApi.data.platforms
					.map((e) => e.platform.name)
					.join(', '),
				genres: dataApi.data.genres.map(({name}) => name).join(', '),
				rating: dataApi.data.rating,
				source: dataApi.data.source,
				released: dataApi.data.released,
				description: dataApi.data.description_raw,
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getVideogames,
	createVideogame,
	getVideogameById,
};
