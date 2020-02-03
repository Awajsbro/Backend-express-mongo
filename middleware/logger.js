function log(res, res, next) {
  console.log('in')
  next()
}

module.exports = log
