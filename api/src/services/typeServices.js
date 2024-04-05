const axios = require('axios');
const typeStructure = require('../utils/typeStructure');
const { Type } = require('../db');
const { where } = require('sequelize');

const getAllService = async () => {
    try {
        const { data: { results } } = await axios.get("https://pokeapi.co/api/v2/type");
        const promises = results.map(type => {
            return axios.get(type.url)
        })
        const details = await Promise.all(promises);
        const types = typeStructure(details.map(det => det.data))
        try {
            types.map(async t => {
                await Type.findOrCreate({
                    where: t.id,
                    defaults: t
                })
            })
            return { results: types, status: 200 }
        } catch (error) {
            throw error
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllService
}