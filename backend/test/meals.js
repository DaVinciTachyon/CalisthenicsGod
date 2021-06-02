const {
  get,
  login,
  post,
  patch,
  deleteRequest,
  buildRandomIngredientReference,
  buildRandomPresetMealReference,
  randomFloat,
} = require('./util');
const chai = require('chai');
const should = chai.should();

let authToken;
let expectedIngredient;
let expectedMealId;
let expectedPresetMealId;

before(async () => {
  authToken = await login();
  expectedIngredient = await buildRandomIngredientReference(authToken);
  expectedPresetMealId = await buildRandomPresetMealReference(authToken);
});

describe('Meals', () => {
  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/nutrition/meals', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/api/nutrition/meals', {}, authToken);
      res.should.have.status(400);
    });

    it('valid meal', async () => {
      const res = await post(
        '/api/nutrition/meals',
        {
          ingredient: expectedIngredient,
        },
        authToken
      );
      res.should.have.status(200);
      expectedIngredient._id = res.body.ingredient._id;
      expectedMealId = res.body._id;
    });
  });

  describe('/PATCH', () => {
    it('empty body', async () => {
      const res = await patch('/api/nutrition/meals', {}, authToken);
      res.should.have.status(400);
    });

    it('valid request', async () => {
      const patchedIngredient = JSON.parse(JSON.stringify(expectedIngredient));
      patchedIngredient.weight = randomFloat();
      patchedIngredient.id = undefined;
      const res = await patch(
        '/api/nutrition/meals',
        {
          _id: expectedMealId,
          ingredient: patchedIngredient,
        },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/DELETE', () => {
    it('empty body', async () => {
      const res = await deleteRequest('/api/nutrition/meals', {}, authToken);
      res.should.have.status(400);
    });

    it('valid request', async () => {
      const res = await deleteRequest(
        '/api/nutrition/meals',
        {
          _id: expectedMealId,
          ingredient: { _id: expectedIngredient._id },
        },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/POST /addPreset', () => {
    it('empty body', async () => {
      const res = await post('/api/nutrition/meals/addPreset', {}, authToken);
      res.should.have.status(400);
    });

    it('valid request', async () => {
      const res = await post(
        '/api/nutrition/meals/addPreset',
        { _id: expectedPresetMealId },
        authToken
      );
      res.should.have.status(200);
    });
  });
});
