const { Router } = require('express');
const { getAllPokemonsApi, searchPokemon,} = require('../handlers/pokemon/getPokesHandlers');
const postPokesHandler = require('../handlers/pokemon/postPokesHandler');

const pokemons = Router();

pokemons.get('/', getAllPokemonsApi);
pokemons.get('/search', searchPokemon);
pokemons.post('/', postPokesHandler);



module.exports = pokemons;