const { get, login, patch, randomInt, randomFloat } = require('./util');
const chai = require('chai');
const should = chai.should();

describe('Nutrition', () => {
  let authToken;

  before(async () => {
    authToken = await login();
  });

  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/nutrition', authToken);
      res.should.have.status(200);
    });
  });

  describe('/PATCH', () => {
    it('empty body', async () => {
      const res = await patch('/nutrition', {}, authToken);
      res.should.have.status(400);
    });

    it('valid nutrient info', async () => {
      const res = await patch(
        '/nutrition',
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
      const res = await get('/nutrition/goals', authToken);
      res.should.have.status(200);
    });
  });

  describe('/GET /macronutrientDensities', () => {
    it('valid request', async () => {
      const res = await get('/nutrition/macronutrientDensities', authToken);
      res.should.have.status(200);
    });
  });
});
