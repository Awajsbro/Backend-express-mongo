const { InternalServerError, NotFound, BadRequest } = require('./response')

function makeCrud(router, route, mongoModele, joiModele, allowedChange) {

  router.get(route, (req, res) => {
    mongoModele.find((err, result) => {
      if (err)
        return InternalServerError(res, err)
      res.status(200).json(result)
    })
  })

  router.get(route + '/:id', (req, res) => {
    const id = req.params.id
    mongoModele.findOne({ _id: id, deleted: { $ne: false } }, (err, result) => {
      if (err)
        InternalServerError(res, err)
      else if (!result)
        NotFound(res)
      else
        res.status(200).json(result)
    })
  })

  router.post(route, async (req, res) => {
    const { error } = joiModele.validate(req.body)
    if (error) {
      console.error(error.details[0].message)
      return BadRequest(res, error)
    }
    try {
      const toPost = new mongoModele(req.body)
      await toPost.save()
      res.status(201).json(toPost)
    } catch (error) {
      console.error(error.errmsg)
      if (error.name === 'MongoError')
        return BadRequest(res, error)
      InternalServerError(res, error)
    }
  })

  router.patch(route + '/:id', async (req, res) => {
    try {
      if (!req.body || !Object.keys(req.body).length > 0)
        return BadRequest(res)

      const result = await mongoModele.findById(req.params.id)
      if (!result)
        return NotFound(res, result)

      const changes = req.body
      if (allowedChange !== null) {
        for (let property in changes) {
          if (changes.hasOwnProperty(property) && allowedChange.includes(property))
            result[property] = changes[property]
        }
      } else Object.keys(changes).forEach(property => {
        result[property] = changes[property]
      })
      await result.save()

      res.status(200).json(result)

    } catch (error) {
      console.error(error, error.errmsg)
      if (error.name === 'MongoError')
        return BadRequest(res, error)
      return InternalServerError(res, error)
    }
  })

  router.delete(route + '/:id', async (req, res) => {
    try {
      const result = await mongoModele.findById(req.params.id)
      if (!result)
        return NotFound(res, 'Not found')

      result.deleted = true // <=
      await result.save()
      res.status(204).end(result)
      
    } catch (error) {
      console.error(error.errmsg)
      if (error.name === 'MongoError')
        return BadRequest(res, error)
      return InternalServerError(res, error)
    }
  })
}

module.exports = makeCrud
