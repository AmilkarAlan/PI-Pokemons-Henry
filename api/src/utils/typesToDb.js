const { Type } = require("../db")
const axios = require("axios");
const dataTypes = require("../mock/tipos.json")
module.exports = async (results) => {

    let allApiTypes = await Promise.all(
        results.map(async (type) => {
            let { data } = await axios.get(type.url);

            let id = data.id;
            let en_name = data.name;
            let es_name = data.names[ 5 ].name.toLowerCase();
            let typeInfo = dataTypes.find(type => type.name.toLowerCase() === es_name);
            let image, icon;
            if (typeInfo) {
                image = typeInfo.symbol;
                icon = typeInfo.icon;
            } else {
                image = "";
                icon = "";
            }
            let pokemon = data.pokemon.map((pk) => {
                return {
                    name: pk.pokemon.name,
                }
            })

            await Type.findOrCreate({
                where:
                    { id, es_name, },
                defaults:
                    { en_name, image, icon, pokemon }
            })

            return {
                id, en_name, es_name, image, icon, pokemon
            }
        })
    )
    return allApiTypes
}