const { Type } = require("../db")
const axios = require("axios");

module.exports = async (results) => {
    let allApiTypes = await Promise.all(
        results.map(async (type) => {
            let { data } = await axios.get(type.url);
            await Type.findOrCreate({ where: { name: data.name, id: data.id } })
            return {
                id: data.id,
                name: data.name,
                pokemon: data.pokemon.map((pk) => {
                    return {
                        name: pk.pokemon.name,
                    }
                }),
            }
        }).sort()

        )
    return allApiTypes
}