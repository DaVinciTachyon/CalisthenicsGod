const {
  get,
  post,
  deleteRequest,
  patch,
  login,
  randomString,
  buildRandomStage,
} = require('./util');
const chai = require('chai');
const should = chai.should();
let authToken = '';

const expectedStage = buildRandomStage();

before(async () => {
  authToken = await login();
});

describe('Stage', () => {
  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/workout/stage', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/api/workout/stage', {}, authToken);
      res.should.have.status(400);
    });

    it('valid stage', async () => {
      const res = await post('/api/workout/stage', expectedStage, authToken);
      expectedStage._id = res.body._id;
      res.should.have.status(200);
    });
  });

  describe('/PATCH', () => {
    it('empty body', async () => {
      const res = await patch('/api/workout/stage', {}, authToken);
      res.should.have.status(400);
    });

    it('valid stage', async () => {
      const patchedStage = JSON.parse(JSON.stringify(expectedStage));
      patchedStage.name = randomString(5);
      patchedStage.chronologicalRanking = undefined;
      const res = await patch('/api/workout/stage', patchedStage, authToken);
      res.should.have.status(200);
    });
  });

  describe('/DELETE', () => {
    it('empty body', async () => {
      const res = await deleteRequest('/api/workout/stage', {}, authToken);
      res.should.have.status(400);
    });

    it('valid id', async () => {
      const res = await deleteRequest(
        '/api/workout/stage',
        { _id: expectedStage._id },
        authToken
      );
      res.should.have.status(200);
    });
  });
});
