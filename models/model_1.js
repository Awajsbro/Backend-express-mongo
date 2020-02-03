const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
Joi.ObjectId = require('joi-objectid')(Joi)
const Joigoose = require('joigoose')(mongoose)

const joiModele = Joi.object({
  name: Joi.string().required(),
  models_2: Joi.ObjectId().required(),
  date: Joi.date().meta({ _mongoose: { default: Date.now() } }),
})

let mongoModele = new mongoose.Schema(Joigoose.convert(joiModele))
mongoModele = mongoose.model('Model_1', mongoModele)

module.exports = { joiModele, mongoModele }
