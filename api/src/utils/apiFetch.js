const axios = require("axios");
const url_all = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1024"
const url_poke = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
const url_type = "https://pokeapi.co/api/v2/type"
let nextPage
let prevPage

const fetchAll = async () =>{
    try {
        const {data} = await axios.get(url_all)
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



const getApiTypes = async () =>{
    try {
        const {data} = await axios.get(url_type);
        const results = data.results
        return results
    } catch (error) {
        throw error
    }
}

const dataFetch = async (url) =>{
    try {
        const {data} = await axios.get(url);
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
            type: data.types.map((tipo) => {return {name:tipo.type.name}}),
        };
    } catch (error) {
       throw new Error("Error al hacer fetch")
    }
}

module.exports = {
    // dataInit,
    // dataNext,
    // dataPrev,
    getApiTypes,
    dataFetch,
    fetchAll,
}



