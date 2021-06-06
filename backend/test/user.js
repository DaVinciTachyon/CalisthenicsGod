const { get, login, post, randomEmail } = require('./util');
const chai = require('chai');
const { expect } = require('chai');
const should = chai.should();

describe('Users', () => {
  let authToken;
  let expectedEmail;

  before(async () => {
    authToken = await login();
    expectedEmail = randomEmail();
  });

  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/api/user', authToken);
      res.should.have.status(200);
    });
  });

  describe('/POST', () => {
    it('empty body', async () => {
      const res = await post('/api/user', {}, authToken);
      res.should.have.status(200);
    });

    it('email', async () => {
      const res = await post(
        '/api/user',
        {
          email: expectedEmail,
        },
        authToken
      );
      res.should.have.status(200);
      const getRes = await get('/api/user', authToken);
      getRes.should.have.status(200);
      expect(getRes.body.email).to.equal(expectedEmail);
    });

    it('duplicate email', async () => {
      const duplicateAuthToken = await login();
      const res = await post(
        '/api/user',
        {
          email: expectedEmail,
        },
        duplicateAuthToken
      );
      res.should.have.status(400);
    });
  });
});
