const {
  get,
  login,
  post,
  patch,
  deleteReq,
  buildRandomIngredientReference,
  buildRandomPresetMealReference,
  randomFloat,
} = require('./util')
const chai = require('chai')
const should = chai.should()

describe('Meals', () => {
  let authToken
  let expectedIngredient
  let expectedMealId
  let expectedPresetMealId

  before(async () => {
    authToken = await login()
    expectedIngredient = await buildRandomIngredientReference(authToken)
    expectedPresetMealId = await buildRandomPresetMealReference(authToken)
  })

  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/nutrition/meals', authToken)
      res.should.have.status(200)
    })
  })

  describe('/DELETE', () => {
    it('empty body', async () => {
      const res = await deleteReq('/nutrition/meals', {}, authToken)
      res.should.have.status(400)
    })

    it('valid request', async () => {
      const mealId = (
        await post(
          '/nutrition/meals/ingredient',
          {
            ingredient: expectedIngredient,
          },
          authToken,
        )
      ).body._id
      const res = await deleteReq(
        '/nutrition/meals',
        { _id: mealId },
        authToken,
      )
      res.should.have.status(200)
    })
  })

  describe('/POST /ingredient', () => {
    it('empty body', async () => {
      const res = await post('/nutrition/meals/ingredient', {}, authToken)
      res.should.have.status(400)
    })

    it('valid meal', async () => {
      const res = await post(
        '/nutrition/meals/ingredient',
        {
          ingredient: expectedIngredient,
        },
        authToken,
      )
      res.should.have.status(200)
      expectedIngredient._id = res.body.ingredient._id
      expectedMealId = res.body._id
    })
  })

  describe('/PATCH /ingredient', () => {
    it('empty body', async () => {
      const res = await patch('/nutrition/meals/ingredient', {}, authToken)
      res.should.have.status(400)
    })

    it('valid request', async () => {
      const patchedIngredient = JSON.parse(JSON.stringify(expectedIngredient))
      patchedIngredient.weight = randomFloat()
      const res = await patch(
        '/nutrition/meals/ingredient',
        {
          _id: expectedMealId,
          ingredient: patchedIngredient,
        },
        authToken,
      )
      res.should.have.status(200)
    })
  })

  describe('/DELETE /ingredient', () => {
    it('empty body', async () => {
      const res = await deleteReq('/nutrition/meals/ingredient', {}, authToken)
      res.should.have.status(400)
    })

    it('valid request', async () => {
      const res = await deleteReq(
        '/nutrition/meals/ingredient',
        {
          _id: expectedMealId,
          ingredient: { _id: expectedIngredient._id },
        },
        authToken,
      )
      res.should.have.status(200)
    })
  })

  describe('/POST /addPreset', () => {
    it('empty body', async () => {
      const res = await post('/nutrition/meals/addPreset', {}, authToken)
      res.should.have.status(400)
    })

    it('valid request', async () => {
      const res = await post(
        '/nutrition/meals/addPreset',
        { _id: expectedPresetMealId },
        authToken,
      )
      res.should.have.status(200)
    })
  })
})
