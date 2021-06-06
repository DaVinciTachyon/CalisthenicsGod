const { get, post, login, buildRandomWorkout } = require('./util');
const chai = require('chai');
const should = chai.should();

describe('Workout', () => {
  let authToken;
  let expectedWorkout;

  before(async () => {
    authToken = await login();
    expectedWorkout = await buildRandomWorkout(authToken);
  });

  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/workout', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/api/workout', {}, authToken);
      res.should.have.status(200);
    });

    it('valid workout', async () => {
      const res = await post('/api/workout', expectedWorkout, authToken);
      res.should.have.status(200);
      expectedWorkout._id = res.body._id;
    });
  });
});
