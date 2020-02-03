const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')

const api = require('./routes/api')
const log = require('./middleware/logger')

const app = express()

mongoose.connect('mongodb://localhost/Olystic', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('failed to connect', err))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(log)
if (app.get('env') === 'dev')
  app.use(morgan())

app.use('/api', api)

// console.log(config.get('password'))

const port = 8003

app.listen(port, () => console.log(`listenning on port ${port}`))

console.log('marche')
