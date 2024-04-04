const axios = require('axios');
const pokeStructure = require("../utils/pokeStructure")

const url_all = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025"
const url_extra = "https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=1025"

const getAllService = async (offset, limit, url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`) => {

    let pokemons = []
    const { data } = await axios.get(url);

    // Procesa los resultados aquí
    const promises = data.results.map(async pokemon => {
        const details = await axios.get(pokemon.url);
        const species = await axios.get(details.data.species.url);
        const evolutions = await axios.get(species.data.evolution_chain.url);
        pokemons.push({ ...details.data, evolutions: evolutions.data.chain });
    });
    await Promise.all(promises);
    pokemons = pokeStructure(pokemons)
    // Si hay una página siguiente, haz una llamada recursiva para obtener esos datos
    if (data.next && pokemons.length < limit) {
        const nextOffset = offset + limit;
        pokemons = pokemons.concat(await getAllService(nextOffset, limit, data.next));
    }
    return pokemons
}

module.exports = {
    getAllService
}