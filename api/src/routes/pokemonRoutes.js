const { Router } = require('express');
const { getAllPokemons } = require('../controllers/pokemonControllers');

const pokemons = Router();

pokemons
    .get('/', getAllPokemons)
    // .get('/search', searchPokemon)
    // .post('/', postPokesHandler)
module.exports = pokemons;