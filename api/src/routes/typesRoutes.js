const { Router } = require('express');
const {getTypes} = require('../handlers/types/getTypesHandler');

const types = Router();

types.get('/', getTypes);

module.exports = types;