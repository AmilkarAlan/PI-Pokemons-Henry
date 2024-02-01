const axios = require("axios");

module.exports = async (results) => {
    try {

        const pokeData = await Promise.all(
            results.map(async (pk) => {
                let pokemon = await axios.get(pk.url);
                return {
                    id: pokemon.data.id,
                    name: pokemon.data.name,
                    base_hp: pokemon.data.stats[ 0 ].base_stat,
                    base_attack: pokemon.data.stats[ 1 ].base_stat,
                    base_defense: pokemon.data.stats[ 2 ].base_stat,
                    base_speed: pokemon.data.stats[ 5 ].base_stat,
                    height: pokemon.data.height,
                    weight: pokemon.data.weight,
                    image: pokemon.data.sprites.front_default,
                    imageAnimated: pokemon.data.sprites.other.showdown.front_default,
                    type: pokemon.data.types.map((tipo) => {return {name: tipo.type.name}}),
                };
            })
        );
        return pokeData
    } catch (error) {
        throw error
    }
}









