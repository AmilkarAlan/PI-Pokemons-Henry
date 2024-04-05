// const {getApiTypes} = require("../../utils/apiFetch");
const typesToDb = require("../../utils/typesToDb");

const getTypes = async (req, res) =>{
    try {
        const apiTypes = await getApiTypes();
        const types = await typesToDb(apiTypes);
        return res.status(200).json(types);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getTypes,
}