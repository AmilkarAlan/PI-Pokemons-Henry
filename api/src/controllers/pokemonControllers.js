const { getAllService, getOneService, postService } = require("../services/pokemonServices");

const getAllPokemons = async (req, res) => {
    // requerimento por query para la busqueda en api
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 110;

    try {
        // Llamada al servicio 
        const pokemons = await getAllService(offset, limit);
        // respuesta de la api
        return res.status(200).send({ status: "Ok", results: pokemons });

    } catch (error) {
        return res.status(error.response.status).send({ status: error.response.status, results: error.message });
    }
}

const getOnePokemon = async (req, res) => {
    const { id } = req.params
    const { name } = req.query
    try {
        // Llamada al servicio
        const pokemon = await getOneService(id || name);
        return res.status(200).send({ status: pokemon.status || "Ok", results: pokemon });

    } catch (error) {
        return res.status(error.response.status).send({ status: error.response.status, results: error.message });
    }
}

const postPokemon = async (req, res) => {
    const pokemon = req.body;
    try {
        const newPokemon = await postService(pokemon);
        return res.status(200).send({ status: newPokemon.status || "Ok", message: newPokemon.message, results: newPokemon.results });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllPokemons,
    getOnePokemon,
    postPokemon
}