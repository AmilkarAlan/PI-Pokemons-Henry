const axios = require("axios");

module.exports = async (results) => {
    try {

        const pokeData = await Promise.all(
            results.map(async (pk) => {
                let {data:pokemon} = await axios.get(pk.url);
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    base_hp: pokemon.stats[ 0 ].base_stat,
                    base_attack: pokemon.stats[ 1 ].base_stat,
                    base_defense: pokemon.stats[ 2 ].base_stat,
                    base_speed: pokemon.stats[ 5 ].base_stat,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    image: pokemon.sprites.front_default,
                    imageAnimated: pokemon.sprites.other.showdown.front_default,
                    type: pokemon.types.map((tipo) => {return {name: tipo.type.name}}),
                };
            })
        );
        return pokeData
    } catch (error) {
        throw error
    }
}









