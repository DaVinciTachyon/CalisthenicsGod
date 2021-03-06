const {
  get,
  login,
  post,
  buildRandomPresetMeal,
  buildRandomIngredientReference,
  deleteReq,
  patch,
} = require('./util');
const chai = require('chai');
const { randomString } = require('../../util/util');
const should = chai.should();

describe('Preset Meals', () => {
  let authToken;
  let expectedPresetMeal;
  let expectedIngredientReference;

  before(async () => {
    authToken = await login();
    expectedPresetMeal = await buildRandomPresetMeal(authToken);
    expectedIngredientReference = await buildRandomIngredientReference(
      authToken
    );
  });

  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/nutrition/meals/preset', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/nutrition/meals/preset', {}, authToken);
      res.should.have.status(400);
    });

    it('valid meal', async () => {
      const res = await post(
        '/nutrition/meals/preset',
        expectedPresetMeal,
        authToken
      );
      res.should.have.status(200);
      expectedPresetMeal._id = res.body._id;
      expectedPresetMeal.ingredients = expectedPresetMeal.ingredients.map(
        (ingredient, index) => ({
          ...ingredient,
          _id: res.body.ingredients[index]._id,
        })
      );
    });
  });

  describe('/PATCH', () => {
    it('empty body', async () => {
      const res = await patch('/nutrition/meals/preset', {}, authToken);
      res.should.have.status(400);
    });

    it('valid meal', async () => {
      const patchedPresetMeal = JSON.parse(JSON.stringify(expectedPresetMeal));
      patchedPresetMeal.name = randomString(5);
      const res = await patch(
        '/nutrition/meals/preset',
        patchedPresetMeal,
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/POST /ingredients', () => {
    it('empty body', async () => {
      const res = await post(
        '/nutrition/meals/preset/ingredients',
        {},
        authToken
      );
      res.should.have.status(400);
    });

    it('valid meal', async () => {
      const res = await post(
        '/nutrition/meals/preset/ingredients',
        { _id: expectedPresetMeal._id },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/POST /ingredient', () => {
    it('empty body', async () => {
      const res = await post(
        '/nutrition/meals/preset/ingredient',
        {},
        authToken
      );
      res.should.have.status(400);
    });

    it('valid request', async () => {
      const res = await post(
        '/nutrition/meals/preset/ingredient',
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
      const res = await deleteReq(
        '/nutrition/meals/preset/ingredient',
        {},
        authToken
      );
      res.should.have.status(400);
    });

    it('valid request', async () => {
      const res = await deleteReq(
        '/nutrition/meals/preset/ingredient',
        {
          _id: expectedPresetMeal._id,
          ingredient: { _id: expectedIngredientReference._id },
        },
        authToken
      );
      res.should.have.status(200);
    });
  });
});
