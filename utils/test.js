const assert = require('assert')
const Axios = require('axios')
const jwt = require('jsonwebtoken')

const contentType = require('content-type')

const axios = Axios.create({ validateStatus: status => true })

const apiUrl = 'http://localhost/8003/test'

let testUserId
let token

// function makeHeader(jwt) {
//   return { headers: { Authorization: 'Bearer ' + jwt } }
// }

describe('/', function () {
  it('should fetch all tests', async () => {
    const res = await axios.get(apiUrl)
    assert.strictEqual(res.status, 200)
    const { type } = contentType.parse(res)
    assert.strictEqual(type, 'text/plain')
    assert.ok(res.data)
  })
})


describe('/', function () {
  it('post should return 200 with test created', async () => {
    const res = await axios.post(apiUrl, { name: 'coucou' })
    assert.strictEqual(res.status, 200)
    const { type } = contentType.parse(res)
    assert.strictEqual(type, 'application/jwt')
    const payload = jwt.decode(res.data)
    testUserId = payload.sub
    assert.ok(payload.sub)
    token = res.data
  })
  it('post should return 400 whit invalid request', async () => {
    const res = await axios.post(apiUrl, { namme: 'coucou' })
    assert.strictEqual(res.status, 400)
  })
  it('post should return 400 whit invalid request', async () => {
    const res = await axios.post(apiUrl, { name: '' })
    assert.strictEqual(res.status, 400)
  })
})

describe('/:id', function () {
  it('put should return 200 with the modified test', async () => {
    const res = await axios.get(apiUrl + id)
    assert.strictEqual(res.status, 200)
    assert.ok(res.data.status)
  })
  it('put should return 400 with the modified test', async () => {
    const res = await axios.get(apiUrl + id)
    assert.strictEqual(res.status, 400)
    assert.ok(res.data.status)
  })
  it('put should return 404 with the modified test', async () => {
    const res = await axios.get(apiUrl + id)
    assert.strictEqual(res.status, 404)
    assert.ok(res.data.status)
  })
})
