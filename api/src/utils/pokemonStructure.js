const axios = require('axios');

const url_all = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=25"
const url_extra = "https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=25"

const getPokemonUrl = async (url) => {
    if (!url) url = url_all
    try {
        const { data: { results } } = await axios.get(url);
        return results;
    } catch (error) {
        throw new Error(error);
    }
}

const fetchPokemonUrls = async (info) => {
    try {
        const pokeData = await Promise.all(
            info.map(async (pk) => {
                const { data } = await axios.get(pk.url)
                if (data.chain) return data.chain
                return data
            }))


        return pokeData
    } catch (error) {
        throw new Error(error)
    }
}

const createPokemonArray = async () => {
    try {
        const info = await getPokemonUrl();
        const infoFetch = await fetchPokemonUrls(info);
        const pokemons = infoFetch.map((pk) => {
            return {
                id: pk.id,
                name: pk.name,
                height: pk.height,
                weight: pk.weight,
                image: pk.sprites.front_default,
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

        return pokemons
    } catch (error) {
        throw new Error(error)
    }
}

const createEvolutionsArray = async () => {
    try {
        const info = await getPokemonUrl(url_extra);
        const infoFetch = await fetchPokemonUrls(info);
        const evolutionsUrls = infoFetch.map((evol) => {

            if (!evol.evolves_from_species) return { url: evol.evolution_chain.url }
            return null

        })
        const evolutionsFetch = await fetchPokemonUrls(evolutionsUrls.filter(e => e))
        const evolutionsChains = evolutionsFetch.map((evol) => {

            return {
                name: evol.species.name,
                first_evol: evol.evolves_to[ 0 ].species.name,
                second_evol: evol.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name
            }


        })

        return evolutionsChains
    } catch (error) {
        throw new Error(error)
    }
}

const getAllPokemons = async () => {
    try {
        const pokemonWhitOutEvol = await createPokemonArray();
        const evolutions = await createEvolutionsArray();
        const pokemonsComplete = pokemonWhitOutEvol.map((pk) => {
            let evolutionsArr = evolutions.find(e => e.name === pk.name)
            return { ...pk, evolutions: evolutionsArr }
        })
        return pokemonsComplete
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {

    createPokemonArray,
    createEvolutionsArray,
    getAllPokemons
}