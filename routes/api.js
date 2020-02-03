const express = require('express')

const Model_1 = require('../models/model_1')
const Model_2 = require('../models/model_2')
const makeCrud = require('../utils/makeCrud')

const router = express.Router()
makeCrud(router, '/model_1', Model_1.mongoModele, Model_1.joiModele, ['models_2', 'date'])
makeCrud(router, '/model_2', Model_2.mongoModele, Model_2.joiModele, ['name', 'things'])

module.exports = router
