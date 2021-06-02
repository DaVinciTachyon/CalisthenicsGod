const {
  get,
  login,
  post,
  patch,
  deleteRequest,
  buildRandomIngredientReference,
} = require('./util');
const chai = require('chai');
const should = chai.should();

let authToken;
let expectedIngredient;

before(async () => {
  authToken = await login();
  expectedIngredient = await buildRandomIngredientReference(authToken);
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
      console.log(expectedIngredient);
      const res = await post(
        '/api/nutrition/meals',
        {
          ingredient: expectedIngredient, //FIXME undefined nutrientInfo
        },
        authToken
      );
      console.log(res.body);
      res.should.have.status(200);
    });
  });

  describe('/PATCH', () => {
    it('empty body', async () => {
      const res = await patch('/api/nutrition/meals', {}, authToken);
      res.should.have.status(400);
    });
    //TODO
  });

  describe('/DELETE', () => {
    it('empty body', async () => {
      const res = await deleteRequest('/api/nutrition/meals', {}, authToken);
      res.should.have.status(400);
    });
    //TODO
  });

  describe('/POST /addPreset', () => {
    it('empty body', async () => {
      const res = await post('/api/nutrition/meals/addPreset', {}, authToken);
      res.should.have.status(400);
    });
    //TODO
  });
});
