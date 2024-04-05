const extra = require("../mock/tipos.json")

const transformTypeData = (types) => {
    let type = {
        id: types.id,
        en_name: types.name,
        es_name: types.names[ 5 ].name.toLowerCase(),
    }
    let typeInfo = extra.find(i => i.name.toLowerCase() === type.es_name);
    if (typeInfo) {
        type = { ...type, icon: typeInfo.icon, symbol: typeInfo.symbol }
    } else {
        type = { ...type, icon: "", symbol: "" }
    }
    let pokeRelation = types.pokemon.map(pk => ({ specie: pk.pokemon.name }))
    type = { ...type, pokemon: pokeRelation }
    return type
}
module.exports = (types) => {
    // Si pk es un array, transforma cada elemento
    if (Array.isArray(types)) {
        return types.map(transformTypeData)
    }
    // Si pk es un solo objeto, transforma ese objeto
    return transformTypeData(types)
}