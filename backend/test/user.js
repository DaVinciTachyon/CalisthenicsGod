const { get, login, post, randomEmail } = require('./util');
const chai = require('chai');
const { expect } = require('chai');
const should = chai.should();

let authToken;
const expectedEmail = randomEmail();

before(async () => {
  authToken = await login();
});

describe('Users', () => {
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
