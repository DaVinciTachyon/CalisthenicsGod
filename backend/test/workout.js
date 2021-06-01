const {
  get,
  post,
  deleteRequest,
  patch,
  login,
  randomString,
  buildRandomWorkout,
} = require('./util');
const chai = require('chai');
const should = chai.should();
let authToken = '';

const expectedWorkout = buildRandomWorkout();

before(async () => {
  authToken = await login();
});

describe('Workout', () => {
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
      expectedWorkout._id = res.body._id;
      res.should.have.status(200);
    });
  });
});
