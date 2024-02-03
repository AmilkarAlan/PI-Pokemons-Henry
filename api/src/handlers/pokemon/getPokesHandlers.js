const { dataFetch, fetchAll, fetchExtra, extraData } = require("../../utils/apiFetch");
const pokeInfo = require("../../utils/pokeInfo");
const { Pokemon, Type } = require("../../db");
const { where } = require("sequelize");
const { createPokemonArray, createEvolutionsArray, getAllPokemons } = require("../../utils/pokemonStructure");


// const getApiPokemons = async (req, res) => {
//     const { id, name } = req.query
//     try {
//         const pokemons = await dataInit();
//         const pokeData = await pokeInfo(pokemons);
//         if (id || name) {
//             try {
//                 const pokemon = await dataFetch(`https://pokeapi.co/api/v2/pokemon/${id || name}`)
//                 console.log(id);
//                 return res.status(200).json(pokemon)
//             } catch (Apierror) {
//                 let searchCondition = {};
//                 if (id) {
//                     searchCondition = { id: id };
//                 } else if (name) {
//                     searchCondition = { name: name };
//                 }

//                 try {
//                     const pokemonDb = await Pokemon.findOne({
//                         where: searchCondition, include: [ {
//                             model: Type,
//                             through: {
//                                 attributes: []
//                             }
//                         } ]
//                     });
//                     if (pokemonDb) return res.status(200).json(pokemonDb)

//                     return res.status(404).json({ error: "Pokemon not found" });
//                 } catch (dbError) {
//                     return res.status(500).json({ error: dbError.message });
//                 }
//             }
//         }
//         return res.status(200).json(pokeData)
//     } catch (error) {
//         return res.status(404).json({ error: error.message });
//     }

// }

// const getNextPokemons = async (req, res) => {
//     try {
//         const pokemons = await dataNext();
//         const pokeData = await pokeInfo(pokemons);
//         return res.status(200).json(pokeData)

//     } catch (error) {
//         return res.status(400).json({ error: error.message });
//     }
// }

// const getPrevPokemons = async (req, res) => {
//     try {
//         const pokemons = await dataPrev();
//         const pokeData = await pokeInfo(pokemons);
//         return res.status(200).json(pokeData)

//     } catch (error) {
//         return res.status(400).json({ error: error.message });
//     }
// }

const getAllPokemonsApi = async (req, res) => {

    try {
        // const pokemons = await createEvolutionsArray();
        const pokemons = await getAllPokemons();
        // const pokemons = await createPokemonArray();
        // const pokemons = await fetchAll();
        // const extraInfo = await fetchExtra()
        // const extra = await extraData(extraInfo)
        // const pokeData = await pokeInfo(pokemons);
        // const pokeDb = await Pokemon.findAll();
        // if (pokeDb.length) return res.status(200).json(pokeData.concat(pokeDb));
        return res.status(200).json(pokemons);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
const searchPokemon = async (req, res) => {
    const { id, name } = req.query

    try {
        const pokemon = await dataFetch(`https://pokeapi.co/api/v2/pokemon/${id || name}`)
        return res.status(200).json(pokemon)
    } catch (Apierror) {
        let searchCondition = {};
        if (id) {
            searchCondition = { id: id };
        } else if (name) {
            searchCondition = { name: name };
        }

        try {
            const pokemonDb = await Pokemon.findOne({
                where: searchCondition, include: [ {
                    model: Type,
                    through: {
                        attributes: []
                    }
                } ]
            });
            if (pokemonDb) return res.status(200).json(pokemonDb)

            return res.status(404).json({ error: "Pokemon not found" });
        } catch (dbError) {
            return res.status(500).json({ error: dbError.message });
        }
    }
}

module.exports = {
    // getApiPokemons,
    // getNextPokemons,
    // getPrevPokemons,
    getAllPokemonsApi,
}