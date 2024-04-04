const { Pokemon, Type } = require("../../db");
const { getAllPokemons, onePokemonFetch, onePokemonEvol} = require("../../utils/pokemonStructure");



const getAllPokemonsApi = async (req, res) => {

    try {
        const pokemons = await getAllPokemons();
        // const pokemons = await createEvolutionsArray();
        return res.status(200).json(pokemons);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const searchPokemon = async (req, res) => {
    const { id, name } = req.query
    try {
        const pokemonStructure = await onePokemonFetch(`https://pokeapi.co/api/v2/pokemon/${id || name}`)
        const evolvesStructure = await onePokemonEvol(`https://pokeapi.co/api/v2/pokemon-species/${id || name}`)
        const pokemon = {...pokemonStructure, evolutions: evolvesStructure}
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
    getAllPokemonsApi,
    searchPokemon
}