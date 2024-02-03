const axios = require("axios");
const url_type = "https://pokeapi.co/api/v2/type"


const getApiTypes = async () => {
    try {
        const { data } = await axios.get(url_type);
        const results = data.results
        return results
    } catch (error) {
        throw error
    }
}

module.exports = {
    getApiTypes,
 
}



