const { get, login, post, randomInt, randomFloat } = require('./util');
const chai = require('chai');
const should = chai.should();

let authToken;

before(async () => {
  authToken = await login();
});

describe('Nutrition', () => {
  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/nutrition', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/api/nutrition', {}, authToken);
      res.should.have.status(400);
    });

    it('valid nutrient info', async () => {
      const res = await post(
        '/api/nutrition',
        {
          calorieOffset: randomInt(),
          caloriesPerKg: randomInt(),
          proteinGramsPerKg: randomFloat(),
          fatCalorieProportion: randomFloat(0, 1),
        },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/GET /goals', () => {
    it('valid request', async () => {
      const res = await get('/api/nutrition/goals', authToken);
      res.should.have.status(200);
    });
  });

  describe('/GET /macronutrientDensities', () => {
    it('valid request', async () => {
      const res = await get('/api/nutrition/macronutrientDensities', authToken);
      res.should.have.status(200);
    });
  });
});
