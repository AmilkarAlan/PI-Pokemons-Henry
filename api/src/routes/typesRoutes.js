const { Router } = require('express');
const { getAllTypes } = require('../controllers/typeControllers');


const types = Router();

types.get('/', getAllTypes);

module.exports = types;