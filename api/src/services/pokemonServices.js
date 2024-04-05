const axios = require('axios');
const pokeStructure = require("../utils/pokeStructure");
const { Pokemon } = require("../db");


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
        const PokemonsDb = await Pokemon.findAll();

        // En caso de haber url next, hacer llamada recursiva a la funcion
        if (data.next && pokemonsApi.length < limit) {
            const nextOffset = offset + limit;
            pokemonsApi = pokemonsApi.concat(await getAllService(nextOffset, limit, data.next));
        }
        return { api: pokemonsApi, db: PokemonsDb }

    } catch (error) {
        throw error;
    }
}

const getOneService = async (id, name) => {
    try {
        if (isNaN(id)) {
            const pokemon = await Pokemon.findOne({where: id})
            return pokemon
        }
        // busqueda en api externa
        let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name || id}`);
        const species = await axios.get(data.species.url);
        const evolutions = await axios.get(species.data.evolution_chain.url);
        data = { ...data, evolutions: evolutions.data.chain };
        const pokemon = pokeStructure(data);
        return pokemon
    } catch (error) {
        throw error;
    }
}

const postService = async (pokemon) => {
    const pokeDbCount = await Pokemon.findAll();

    try {
        const [ poke, created ] = await Pokemon.findOrCreate({
            where: { specie:pokemon.specie},
            defaults: {
                id:  `myId-${pokeDbCount.length + 1}`,
                image: "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                imageAnimated: "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                height: pokemon.height,
                weight: pokemon.weight,
                stats: pokemon.stats
            },
            // include: [ {
            //     model: Type,
            //     through: {
            //         attributes: []
            //     }
            //     }]
        });

        // if (types) {
        //     for (const typeInfo of types) {
        //         const type = await Type.findOne({ where: { name: typeInfo.name } })
        //         await poke.addType(type)
        //     }
        // }

        if (!created) {
            return { message: "Pokemon existe en la base de datos.", results: poke };
        }

        return { message: "Pokemon creado en la base datos.", results: poke };
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllService,
    getOneService,
    postService
}