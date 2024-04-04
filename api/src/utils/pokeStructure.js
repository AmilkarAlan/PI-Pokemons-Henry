
// Función auxiliar para transformar los datos de un Pokémon
function transformPokemonData(pk) {
    let pokemon = {
        id: pk.id,
        specie: pk.name,
        height: pk.height,
        weight: pk.weight,
        image: pk.sprites.front_default ? pk.sprites.front_default : "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
        gifImage: pk.sprites.other.showdown.front_default ? pk.sprites.other.showdown.front_default : "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
        otherImage: pk.sprites.other.dream_world.front_default ? pk.sprites.other.dream_world.front_default : "https://henryjimenezp.github.io/P4-Pokedex/img/pokemon.png",
        stats: pk.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
        })),
        types: pk.types.map(type => ({
            name: type.type.name
        })),
    };

    if (!pk.evolutions.evolves_to.length) {
        return pokemon = {
            ...pokemon,
            evolutions: "Don´t have evolutions"
        }
    }
    if (pk.evolutions.evolves_to.length && pk.evolutions.species.name === pk.name) {
        pokemon = {
            ...pokemon,
            evolutions: {
                next_evol: { specie: pk.evolutions.evolves_to[ 0 ]?.species.name },
                last_evol: pk.evolutions.evolves_to[ 0 ].evolves_to[ 0 ] ? { specie: pk.evolutions.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name } : "Only have one evolution"
            }
        }
    } else if (pk.evolutions.evolves_to.length) {
        return pokemon = {
            ...pokemon,
            evolutions: {
                prev_evol: { specie: pk.evolutions.species.name },
                next_evol: pk.evolutions.evolves_to[ 0 ].evolves_to[ 0 ] ? { specie: pk.evolutions.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name } : "Only have one evolution"
            }
        }
    } else if (pk.evolutions.evolves_to[ 0 ].evolves_to[ 0 ].length) {
        return pokemon = {
            ...pokemon,
            evolutions: {
                specie: { specie: pk.evolutions.species.name },
                prev_evol: { specie: pk.evolutions.evolves_to[ 0 ].species.name }
            }
        }
    }
    return pokemon
}

module.exports = (pk) => {
    // Si pk es un array, transforma cada elemento
    if (Array.isArray(pk)) {
        return pk.map(transformPokemonData);
    }
    // Si pk es un solo objeto, transforma ese objeto
    return transformPokemonData(pk);
};









