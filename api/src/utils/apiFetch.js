const axios = require("axios");
const url_all = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025"
const url_extra = "https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=1025"
const url_type = "https://pokeapi.co/api/v2/type"
let nextPage
let prevPage

const fetchAll = async () => {
    try {
        const { data } = await axios.get(url_all)
        const results = await data.results;
        return results
    } catch (error) {
        throw error
    }
}
const fetchExtra = async () => {
    try {
        const { data } = await axios.get(url_extra)
        const results = await data.results;
        return results
    } catch (error) {
        throw error
    }
}
// const dataInit = async () => {

//     try {
//         const { data } = await axios.get(url_poke);
//         if (data.next || data.previous) {
//             nextPage = data.next;
//             prevPage = data.previous;
//         }
//         const results = await data.results;

//         return results

//     } catch (error) {
//         throw error
//     }
// }

// const dataNext = async () => {

//     if (nextPage !== null) {
//         try {
//             const { data } = await axios.get(nextPage);
//             if (data.next || data.previous) {
//                 nextPage = data.next;
//                 prevPage = data.previous;
//             }
//             const results = data.results;
//             return results
//         } catch (error) {
//             throw error
//         }
//     }
//     const { data } = await axios.get(nextPage);
//     const results = data.results;
//     return results
// }

// const dataPrev = async () => {

//     if (prevPage !== null) {
//         try {
//             const { data } = await axios.get(prevPage);
//             if (data.next || data.previous) {
//                 nextPage = data.next;
//                 prevPage = data.previous;
//             }
//             const results = data.results;
//             return results
//         } catch (error) {
//             throw error
//         }
//     }
//     const { data } = await axios.get(url_poke);
//     const results = data.results;
//     return results
// }



const getApiTypes = async () => {
    try {
        const { data } = await axios.get(url_type);
        const results = data.results
        return results
    } catch (error) {
        throw error
    }
}

const dataFetch = async (url) => {
    try {
        const { data } = await axios.get(url);
        return {
            id: data.id,
            name: data.name,
            base_hp: data.stats[ 0 ].base_stat,
            base_attack: data.stats[ 1 ].base_stat,
            base_defense: data.stats[ 2 ].base_stat,
            base_speed: data.stats[ 5 ].base_stat,
            height: data.height,
            weight: data.weight,
            image: data.sprites.front_default,
            imageAnimated: data.sprites.other.showdown.front_default,
            type: data.types.map((tipo) => { return { name: tipo.type.name } }),
        };
    } catch (error) {
        throw new Error("Error al hacer fetch")
    }
}
// const extraData = async (results) => {
//     try {
//         const { data: { results: pokemons } } = await axios.get(url_all)
//         const allPokemons = await Promise.all(
//             pokemons.map(async (pk) => {
//                 const {data: pokemon} = await axios.get(pk.url)
//                 return pokemon
//             })
//         )
//         const extraInfo = await Promise.all(
//             results.map(async (pk) => {
//                 const { data } = await axios.get(pk.url)
//                 if (data.evolves_from_species === null) {
//                     let { data: evolutionData } = await axios.get(data.evolution_chain.url);
//                     let evolChain = {
//                         evolution_chain: {
//                             first_evolution: evolutionData.chain.evolves_to[ 0 ]?.species.name,
//                             second_evolution: evolutionData.chain.evolves_to[ 0 ]?.evolves_to[ 0 ]?.species.name
//                         }

//                     };
//                     return evolChain;
//                 }
//                 return null;
//             })
//         );
//         return extraInfo.filter(e => e);
//     } catch (error) {
//         throw new Error(error)
//     }
// }

const extraData = async (results) => {
    try {
        const { data: { results: pokemons } } = await axios.get(url_all);
        // Preparar un mapa para acceder fácilmente a la información de la cadena evolutiva por URL
        const evolutionInfoByURL = new Map();

        const extraInfo = await Promise.all(
            results.map(async (pk) => {
                const { data } = await axios.get(pk.url);
                if (data.evolves_from_species === null) {
                    let { data: evolutionData } = await axios.get(data.evolution_chain.url);
                    let evolChain = {
                        first_evolution: evolutionData.chain.evolves_to[0]?.species.name,
                        second_evolution: evolutionData.chain.evolves_to[0]?.evolves_to[0]?.species.name
                    };
                    // Almacenar la información de la cadena evolutiva en el mapa
                    evolutionInfoByURL.set(pk.url, evolChain);
                    return { ...pk, evolution_chain: evolChain }; // Añadir la cadena evolutiva al Pokémon
                }
                return pk; // Retornar el Pokémon sin modificaciones si no cumple con el criterio
            })
        );

        // Mapear sobre el array original de pokemons para añadir la información de la cadena evolutiva
        const pokemonsWithEvolution = pokemons.map(pk => {
            if (evolutionInfoByURL.has(pk.url)) {
                return { ...pk, evolution_chain: evolutionInfoByURL.get(pk.url) };
            }
            return pk; // Retornar el Pokémon sin modificaciones si no tiene información de cadena evolutiva
        });

        return pokemonsWithEvolution;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    // dataInit,
    // dataNext,
    // dataPrev,
    getApiTypes,
    dataFetch,
    fetchAll,
    fetchExtra,
    extraData,
}



