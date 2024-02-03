const axios = require('axios');
const pokeInfo = require('./pokeInfo');

const url_all = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025"
const url_extra = "https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=1025"

const getPokemonUrl = async (url) => {
    if (Array.isArray(url)) {
        try {
            const pokeData = await Promise.all(
                url.map(async (pk) => {
                    const { data } = await axios.get(pk.url)
                    if (data.chain) return data.chain
                    return data
                }))
            return pokeData
        } catch (error) {
            throw new Error("promise all fetch " + error)
        }
    } else {

        if (!url) url = url_all
        try {
            const { data } = await axios.get(url);
            if (data.chain) return data.chain
            if (data.results) return data.results
            return data;
        } catch (error) {
            throw new Error("error al hacer fetch " + error);
        }
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
            let pokemonStructure = { pk };
            return pokemonStructure
        })
        return pokemons
    } catch (error) {
        throw new Error("pokemons " + error)
    }
}

const createEvolutionsArray = async () => {
    try {
        const info = await getPokemonUrl(url_extra);
        const evolutionsChains = await onePokemonEvol(info);
        return evolutionsChains
    } catch (error) {
        throw new Error("evolutions " + error)
    }
}

const getAllPokemons = async () => {
    try {
        const pokemonWhitOutEvol = await createPokemonArray();
        const evolutions = await createEvolutionsArray();
        const pokemonsComplete = pokemonWhitOutEvol.map((pk) => {
            let evolutionsArr = evolutions.find((e) => {
                if (e === null) return {}
                e.name === pk.name
            })
            return { ...pk, evolutions: evolutionsArr }
        })
        return pokemonsComplete
    } catch (error) {
        throw new Error("error al obtener pokemons " + error)
    }
}

const onePokemonFetch = async (url) => {
    try {
        const pokemon = await getPokemonUrl(url);
        const pokemonStructure = pokeInfo(pokemon);
        return pokemonStructure
    } catch (error) {
        throw new Error("Estructura pokemon " + error)
    }
}
const onePokemonEvol = async (url) => {
    try {
        const species = await getPokemonUrl(url);
        if (Array.isArray(species)) {
            return Promise.allSettled(species.map(async (s) => {
                if (!s.evolves_from_species) {
                    const evolves = await getPokemonUrl(s.evolution_chain.url)
                    if (!evolves.evolves_to.length) {
                        return {
                            specie: evolves.species.name,
                            evolution: null
                        }
                    }
                    return {
                        specie: evolves.species.name,
                        evolution:
                        {
                            first_evo: evolves.evolves_to[ 0 ].species.name,
                            last_evo: evolves.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name
                        }

                    }

                }
                const evolves = await getPokemonUrl(s.evolution_chain.url)

                return {
                    specie: s.name,
                    evolution: {
                        prev_evo: evolves.species.name,
                        last_evo: evolves.evolves_to[ 0 ]?.evolves_to[ 0 ]?.species.name
                    }
                }
            })
            )
        }
        return null
        // if (Array.isArray(getEvolves)) {
        //     const urls = getEvolves.map((evol) => {
        //         return { url: evol.evolution_chain.url }
        //     })
        //     const evol = await getPokemonUrl(urls);
        //     const evolutions = evol.map((evol) => {
        //         if (!evol.evolves_from_species) {
        //             if (!evol.evolves_to.length) return {}
        //             return {
        //                 name: evol.name,
        //                 first_evol: evol.evolves_to[ 0 ]?.species.name,
        //                 second_evol: evol.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name
        //             }
        //         }
        //         return {
        //             name: evol.name,
        //             evol_from: evol.evolves_from_species?.name,
        //             second_evol: evol.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name === getEvolves.name ? null : evol.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name
        //         }
        //     })
        //     return evolutions
        // }
        // const evol = await getPokemonUrl(getEvolves.evolution_chain.url);
        // if (!getEvolves.evolves_from_species) {
        //     if (!evol.evolves_to.length) return {}
        //     return {
        //         name: getEvolves.name,
        //         first_evol: evol.evolves_to[ 0 ]?.species.name,
        //         second_evol: evol.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name
        //     }
        // }
        // return {
        //     name: getEvolves.name,
        //     evol_from: getEvolves.evolves_from_species?.name,
        //     second_evol: evol.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name === getEvolves.name ? null : evol.evolves_to[ 0 ].evolves_to[ 0 ]?.species.name
        // }
    } catch (error) {
        throw new Error("error en las evoluciones " + error)
    }
}


module.exports = {

    onePokemonFetch,
    getAllPokemons,
    onePokemonEvol,
    createEvolutionsArray
}