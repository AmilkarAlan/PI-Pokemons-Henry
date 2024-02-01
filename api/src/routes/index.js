const { Router } = require("express");
const pokemonRoutes = require("./pokemonRoutes.js")
const typesRoutes = require("./typesRoutes.js")



const router = Router();


router.use('/pokemons', pokemonRoutes);
router.use('/types', typesRoutes);


module.exports = router;
