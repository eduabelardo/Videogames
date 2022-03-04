const {Router} = require('express');
const {
	getVideogames,
	createVideogame,
	getVideogameById,
} = require('./videogame');
const {returnGenres} = require('./generos');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames/:idGame', getVideogameById);
router.use('/videogames', getVideogames);
router.use('/generos', returnGenres);
router.post('/videogame', createVideogame);
module.exports = router;
