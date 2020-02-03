const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const Joigoose = require('joigoose')(mongoose)

const joiModele = Joi.object({
  name: Joi.string().required(),
  things: Joi.array().meta({ _mongoose: { default: [{}] } }),
})

let mongoModele = new mongoose.Schema(Joigoose.convert(joiModele))
mongoModele = mongoose.model('Model_2', mongoModele)

module.exports = { joiModele, mongoModele }
