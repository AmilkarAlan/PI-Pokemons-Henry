const { Router } = require('express');
const { getAllPokemonsApi,} = require('../handlers/pokemon/getPokesHandlers');
const postPokesHandler = require('../handlers/pokemon/postPokesHandler');

const pokemons = Router();

pokemons.get('/', getAllPokemonsApi);
pokemons.post('/', postPokesHandler);



module.exports = pokemons;