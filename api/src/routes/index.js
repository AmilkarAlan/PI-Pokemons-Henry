const { Router } = require("express");
const pokemonRoutes = require("./pokemonRoutes.js")
const typesRoutes = require("./typesRoutes.js");




const router = Router();


router
    .use('/pokemons', pokemonRoutes)
    .use('/types', typesRoutes)


module.exports = router;
