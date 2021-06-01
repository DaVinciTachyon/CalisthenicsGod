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

  //   describe('/PATCH', () => {
  //     it('empty body', async () => {
  //       const res = await patch('/api/workout', {}, authToken);
  //       res.should.have.status(400);
  //     });

  //     it('valid workout', async () => {
  //       const patchedWorkout = JSON.parse(JSON.stringify(expectedWorkout));
  //       patchedWorkout.name = randomString(5);
  //       const res = await patch('/api/workout', patchedWorkout, authToken);
  //       res.should.have.status(200);
  //     });
  //   });

  //   describe('/DELETE', () => {
  //     it('empty body', async () => {
  //       const res = await deleteRequest('/api/workout', {}, authToken);
  //       res.should.have.status(400);
  //     });

  //     it('valid id', async () => {
  //       const res = await deleteRequest(
  //         '/api/workout',
  //         { _id: expectedWorkout._id },
  //         authToken
  //       );
  //       res.should.have.status(200);
  //     });
  //   });
});
