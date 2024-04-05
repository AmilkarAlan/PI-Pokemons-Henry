const axios = require('axios');
const pokeStructure = require("../utils/pokeStructure");
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");


const getAllService = async (offset, limit, url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`) => {

    try {

        let pokemonsApi = []
        // Fetching de datos
        const { data } = await axios.get(url);
        const promises = data.results.map(async pokemon => {
            const details = await axios.get(pokemon.url);
            const species = await axios.get(details.data.species.url);
            const evolutions = await axios.get(species.data.evolution_chain.url);
            pokemonsApi.push({ ...details.data, evolutions: evolutions.data.chain });
        });

        // Resolver todas las promesas 
        await Promise.all(promises);
        pokemonsApi = pokeStructure(pokemonsApi);

        // Llamado a la base de datos
        const PokemonsDb = await Pokemon.findAll({include: Type});

        // En caso de haber url next, hacer llamada recursiva a la funcion
        if (data.next && pokemonsApi.length < limit) {
            const nextOffset = offset + limit;
            pokemonsApi = pokemonsApi.concat(await getAllService(nextOffset, limit, data.next));
        }
        return { status: 200, results: { api: pokemonsApi, db: PokemonsDb } }

    } catch (error) {
        throw error;
    }
}

const getOneService = async ({ id, name }) => {
    let pokemon;
    let searchCond;
    if (id) {
        searchCond = { id: { [ Op.iLike ]: id + "%" } };
    } else if (name) {
        searchCond = { specie: { [ Op.iLike ]: name } };
    }
    try {
        // busqueda en api externa
        let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase() || id}`)

        const species = await axios.get(data.species.url);
        const evolutions = await axios.get(species.data.evolution_chain.url);
        data = { ...data, evolutions: evolutions.data.chain };
        pokemon = pokeStructure(data);
        pokemon = { results: pokemon, status: 200 }
        return pokemon
    } catch (error) {
        // No se encontró el Pokemon en la API externa, intenta buscar en la base de datos
        try {
            pokemon = await Pokemon.findOne({ where: searchCond, include: Type })
            if (!pokemon) {
                pokemon = { results: "no existe este pokemon aún", status: 404 }
                return pokemon
            }
            return pokemon = { results: pokemon, status: 200 }
        } catch (error) {
            throw error
        }
    }

    // Retorna el Pokemon encontrado
}

const postService = async (pokemon) => {
    const pokeDbCount = await Pokemon.findAll();

    try {
        const [ poke, created ] = await Pokemon.findOrCreate({
            where: { specie: pokemon.specie },
            defaults: {
                id: `myId-${pokeDbCount.length + 1}`,
                specie: pokemon.specie.toLowerCase(),
                image: "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                imageAnimated: "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                height: pokemon.height,
                weight: pokemon.weight,
                stats: pokemon.stats
            },
            include: [ {
                model: Type,
                through: {
                    attributes: []
                }
                }]
        });

        if (pokemon.types) {
            pokemon.types.map(async type => {
                type = await Type.findOne({ where: {en_name:type.name} });
                await poke.addType(type);
            })
        }

        if (!created) {
            return { status: 200, message: "Pokemon existe en la base de datos.", results: poke };
        }

        return { status: 201, message: "Pokemon creado en la base datos.", results: poke };
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllService,
    getOneService,
    postService
}