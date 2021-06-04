const {
  get,
  login,
  post,
  buildRandomPresetMeal,
  buildRandomIngredientReference,
  deleteRequest,
} = require('./util');
const chai = require('chai');
const should = chai.should();

let authToken;
let expectedPresetMeal;
let expectedIngredientReference;

before(async () => {
  authToken = await login();
  expectedPresetMeal = await buildRandomPresetMeal(authToken);
  expectedIngredientReference = await buildRandomIngredientReference(authToken);
});

describe('Preset Meals', () => {
  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/nutrition/meals/preset', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/api/nutrition/meals/preset', {}, authToken);
      res.should.have.status(400);
    });

    it('valid meal', async () => {
      const res = await post(
        '/api/nutrition/meals/preset',
        expectedPresetMeal,
        authToken
      );
      res.should.have.status(200);
      expectedPresetMeal._id = res.body._id;
    });
  });

  describe('/POST /ingredients', () => {
    it('empty body', async () => {
      const res = await post(
        '/api/nutrition/meals/preset/ingredients',
        {},
        authToken
      );
      res.should.have.status(400);
    });

    it('valid meal', async () => {
      const res = await post(
        '/api/nutrition/meals/preset/ingredients',
        { _id: expectedPresetMeal._id },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/POST /ingredient', () => {
    it('empty body', async () => {
      const res = await post(
        '/api/nutrition/meals/preset/ingredient',
        {},
        authToken
      );
      res.should.have.status(400);
    });

    it('valid request', async () => {
      const res = await post(
        '/api/nutrition/meals/preset/ingredient',
        {
          _id: expectedPresetMeal._id,
          ingredient: expectedIngredientReference,
        },
        authToken
      );
      res.should.have.status(200);
      expectedIngredientReference._id = res.body.ingredient._id;
    });
  });

  describe('/DELETE /ingredient', () => {
    it('empty body', async () => {
      const res = await deleteRequest(
        '/api/nutrition/meals/preset/ingredient',
        {},
        authToken
      );
      res.should.have.status(400);
    });

    it('valid request', async () => {
      const res = await deleteRequest(
        '/api/nutrition/meals/preset/ingredient',
        {
          _id: expectedPresetMeal._id,
          ingredient: { _id: expectedIngredientReference._id },
        },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/nutrition/meals/preset/names', authToken);
      res.should.have.status(200);
    });
  });
});
