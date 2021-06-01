const { get, login } = require('./util');
const chai = require('chai');
const should = chai.should();
let authToken = '';

before(async () => {
  authToken = await login();
});

describe('Workout', () => {
  //   describe('/GET', () => {
  //     it('valid request', async () => {
  //       const res = await get('/api/nutrition/ingredients', authToken);
  //       res.should.have.status(200);
  //     });
  //   });
});
