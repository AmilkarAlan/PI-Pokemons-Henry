const { getAllService } = require("../services/typeServices")
const getAllTypes = async (req, res) => {
    try {
        const types = await getAllService()
        return res.status(types.status).send({ status: types.status || "Ok", results: types.results });
    } catch (error) {
        return res.status(error.response.status).send({ status: error.response.status, results: error.message });
    }
}

module.exports = {
    getAllTypes,
}