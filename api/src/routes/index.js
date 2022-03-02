const {Router} = require('express');
const {getVideogames, createVideogame} = require('./videogame');
const {getGeneros} = require('./generos');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', getVideogames);
router.use('/generos', getGeneros);
router.post('/videogame', createVideogame);
module.exports = router;
