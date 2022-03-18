const {Router} = require('express');
const axios = require('axios');
const {API_KEY} = process.env;
const {Generos} = require('../db');

const router = Router();

//Traigo generos de API
const getGeneros = async (req, res, next) => {
	try {
		let apiGenres = await axios.get(
			`https://api.rawg.io/api/genres?key=147ef5f443674b29965dd87783b0dd9a`
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
