const {Router} = require('express');
const axios = require('axios');

const {Generos} = require('../db');

const router = Router();

//Traigo generos de API
const getGeneros = async (req, res, next) => {
	try {
		let apiGenres = await axios.get(
			`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`
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
//Guardo generos en DB
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
