const { Router } = require('express');
const { getAllPokemons, getOnePokemon, postPokemon } = require('../controllers/pokemonControllers');

const pokemons = Router();

pokemons
    .get('/', getAllPokemons)
    .get('/search/', getOnePokemon)
    .get('/search/:id', getOnePokemon)
    .post('/', postPokemon)
module.exports = pokemons;