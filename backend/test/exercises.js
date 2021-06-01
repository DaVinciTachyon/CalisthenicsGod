const { get, post, login, buildRandomExercise } = require('./util');
const chai = require('chai');
const should = chai.should();
let authToken = '';

const expectedExercise = buildRandomExercise();

before(async () => {
  authToken = await login();
});

describe('Exercises', () => {
  describe('/GET', () => {
    it('it should get 200 status', async () => {
      const res = await get('/api/exercise', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('it should get 400 status with empty body', async () => {
      const res = await post('/api/exercise', {}, authToken);
      res.should.have.status(400);
    });

    it('it should get 200 status with valid body', async () => {
      const res = await post('/api/exercise', expectedExercise, authToken);
      res.should.have.status(200);
    });
  });
});
