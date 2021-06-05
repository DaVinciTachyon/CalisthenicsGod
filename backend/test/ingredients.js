const {
  get,
  post,
  login,
  buildRandomIngredient,
  deleteRequest,
  patch,
  randomString,
} = require('./util');
const chai = require('chai');
const should = chai.should();
let authToken;

const expectedIngredient = buildRandomIngredient();

before(async () => {
  authToken = await login();
});

describe('Ingredients', () => {
  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/nutrition/ingredients', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/api/nutrition/ingredients', {}, authToken);
      res.should.have.status(400);
    });

    it('valid', async () => {
      const res = await post(
        '/api/nutrition/ingredients',
        expectedIngredient,
        authToken
      );
      res.should.have.status(200);
      expectedIngredient._id = res.body._id;
    });

    it('duplicate name', async () => {
      const duplicateIngredient = buildRandomIngredient();
      duplicateIngredient.name = expectedIngredient.name;
      const res = await post(
        '/api/nutrition/ingredients',
        duplicateIngredient,
        authToken
      );
      res.should.have.status(400);
    });

    it('duplicate name - different user', async () => {
      const duplicateIngredient = buildRandomIngredient();
      duplicateIngredient.name = expectedIngredient.name;
      const secondAuthToken = await login();
      const res = await post(
        '/api/nutrition/ingredients',
        duplicateIngredient,
        secondAuthToken
      );
      res.should.have.status(200);
    });
  });

  describe('/DELETE', () => {
    it('empty body', async () => {
      const res = await deleteRequest(
        '/api/nutrition/ingredients',
        {},
        authToken
      );
      res.should.have.status(400);
    });

    it('valid', async () => {
      const res = await deleteRequest(
        '/api/nutrition/ingredients',
        { _id: expectedIngredient._id },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/PATCH', () => {
    it('empty body', async () => {
      const res = await patch('/api/nutrition/ingredients', {}, authToken);
      res.should.have.status(400);
    });

    it('valid', async () => {
      const patchedIngredient = JSON.parse(JSON.stringify(expectedIngredient));
      patchedIngredient.name = randomString(5);
      const res = await patch(
        '/api/nutrition/ingredients',
        patchedIngredient,
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/GET unavailable', () => {
    it('valid request', async () => {
      const res = await get(
        '/api/nutrition/ingredients/unavailable',
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/DELETE unavailable', () => {
    it('empty body', async () => {
      const res = await deleteRequest(
        '/api/nutrition/ingredients',
        {},
        authToken
      );
      res.should.have.status(400);
    });

    it('valid', async () => {
      const res = await deleteRequest(
        '/api/nutrition/ingredients',
        { _id: expectedIngredient._id },
        authToken
      );
      res.should.have.status(200);
    });
  });
});
