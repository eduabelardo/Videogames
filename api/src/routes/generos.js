const {Router} = require('express');
const axios = require('axios');
const api_key = process.env.API_KEY;
const {Generos} = require('../db');

const router = Router();

const getGeneros = async (req, res, next) => {
	try {
		let apiGenres = await axios.get(
			`https://api.rawg.io/api/genres?key=${api_key}`
		);
		apiGenres.data.results.forEach((genre) => {
			Generos.findOrCreate({
				where: {name: genre.name},
			});
		});
		console.log('Generos cargados correctamente');
	} catch (error) {
		console.log(error);
	}
};
const returnGenres = async (req, res, next) => {
	try {
		const genresDB = await Generos.findAll();
		res.json(genresDB);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getGeneros,
	returnGenres,
};
