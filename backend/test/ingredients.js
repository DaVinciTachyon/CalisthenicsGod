const {
  get,
  post,
  login,
  buildRandomIngredient,
  deleteReq,
  patch,
  randomString,
} = require('./util');
const chai = require('chai');
const should = chai.should();

describe('Ingredients', () => {
  let authToken;
  let expectedIngredient;

  before(async () => {
    authToken = await login();
    expectedIngredient = buildRandomIngredient();
  });

  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/nutrition/ingredients', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/nutrition/ingredients', {}, authToken);
      res.should.have.status(400);
    });

    it('valid', async () => {
      const res = await post(
        '/nutrition/ingredients',
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
        '/nutrition/ingredients',
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
        '/nutrition/ingredients',
        duplicateIngredient,
        secondAuthToken
      );
      res.should.have.status(200);
    });
  });

  describe('/DELETE', () => {
    it('empty body', async () => {
      const res = await deleteReq('/nutrition/ingredients', {}, authToken);
      res.should.have.status(400);
    });

    it('valid', async () => {
      const res = await deleteReq(
        '/nutrition/ingredients',
        { _id: expectedIngredient._id },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/PATCH', () => {
    it('empty body', async () => {
      const res = await patch('/nutrition/ingredients', {}, authToken);
      res.should.have.status(400);
    });

    it('valid', async () => {
      const patchedIngredient = JSON.parse(JSON.stringify(expectedIngredient));
      patchedIngredient.name = randomString(5);
      const res = await patch(
        '/nutrition/ingredients',
        patchedIngredient,
        authToken
      );
      res.should.have.status(200);
    });
  });
});
