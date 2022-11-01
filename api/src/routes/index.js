const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const middlePokemon = require("./middlelWare/pokemon");
const middleTypes = require("./middlelWare/types");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", middlePokemon);
router.use("/types", middleTypes);

module.exports = router;
