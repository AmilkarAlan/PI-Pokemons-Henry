const axios = require("axios");

module.exports = (pk) => {
    if (Array.isArray(pk)) {
        try {
            pk.map((pk) => {
                return {
                    id: pk.id,
                    name: pk.name,
                    height: pk.height,
                    weight: pk.weight,
                    image: pk.sprites.front_default ?? "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                    gifImage: pk.sprites.other.showdown.front_default ?? "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                    otherImage: pk.sprites.other.dream_world.front_default ?? "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
                    stats: pk.stats.map((stat) => {
                        return {
                            name: stat.stat.name,
                            base_stat: stat.base_stat
                        }
                    }),
                    types: pk.types.map((type) => {
                        return {
                            name: type.type.name
                        }
                    })
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    }
    try {
        const pokemon = {
            id: pk.id,
            name: pk.name,
            height: pk.height,
            weight: pk.weight,
            image: pk.sprites.front_default ?? "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
            gifImage: pk.sprites.other.showdown.front_default ?? "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
            otherImage: pk.sprites.other.dream_world.front_default ?? "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
            stats: pk.stats.map((stat) => {
                return {
                    name: stat.stat.name,
                    base_stat: stat.base_stat
                }
            }),
            types: pk.types.map((type) => {
                return {
                    name: type.type.name
                }
            })
        }
        return pokemon
    } catch (error) {
        throw new Error(error)
    }
}









