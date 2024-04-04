const { getAllService } = require("../services/pokemonServices");

const getAllPokemons = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 110;
    try {
        const pokemons = await getAllService(offset, limit);
        return res.status(200).send({status: "Ok", data: pokemons});

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllPokemons,
    
}