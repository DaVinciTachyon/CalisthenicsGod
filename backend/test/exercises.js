const {
  get,
  post,
  login,
  patch,
  buildRandomExercise,
  deleteRequest,
  randomString,
} = require('./util');
const chai = require('chai');
const should = chai.should();

let authToken;
let expectedExercise;

before(async () => {
  authToken = await login();
  expectedExercise = await buildRandomExercise(authToken);
});

describe('Exercises', () => {
  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/exercise', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/api/exercise', {}, authToken);
      res.should.have.status(400);
    });

    it('valid exercise', async () => {
      const res = await post('/api/exercise', expectedExercise, authToken);
      res.should.have.status(200);
      expectedExercise._id = res.body._id;
    });
  });

  describe('/PATCH', () => {
    it('empty body', async () => {
      const res = await patch('/api/exercise', {}, authToken);
      res.should.have.status(400);
    });

    it('valid exercise', async () => {
      const patchedExercise = JSON.parse(JSON.stringify(expectedExercise));
      patchedExercise.name = randomString(5);
      const res = await patch('/api/exercise', patchedExercise, authToken);
      res.should.have.status(200);
    });
  });

  describe('/DELETE', () => {
    it('empty body', async () => {
      const res = await deleteRequest('/api/exercise', {}, authToken);
      res.should.have.status(400);
    });

    it('valid id', async () => {
      const res = await deleteRequest(
        '/api/exercise',
        { _id: expectedExercise._id },
        authToken
      );
      res.should.have.status(200);
    });
  });
});
