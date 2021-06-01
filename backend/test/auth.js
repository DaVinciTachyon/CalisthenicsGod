const { post, buildRandomUser, randomAlphaNumeric } = require('./util');
const chai = require('chai');
const should = chai.should();

const expectedUser = buildRandomUser();

describe('Auth', () => {
  describe('/POST register', () => {
    it('it should get 400 status with no body', async () => {
      const res = await post('/api/auth/register', {});
      res.should.have.status(400);
    });

    it('it should get 200 status with correctly formed body', async () => {
      const res = await post('/api/auth/register', expectedUser);
      res.should.have.status(200);
    });
  });

  describe('/POST login', () => {
    it('it should get 400 status with no body', async () => {
      const res = await post('/api/auth/login', {});
      res.should.have.status(400);
    });

    it('it should get 400 status with incorrect user', async () => {
      const res = await post('/api/auth/login', {
        email: expectedUser.email,
        password: randomAlphaNumeric(10),
      });
      res.should.have.status(400);
    });

    it('it should get 200 status with correctly formed body', async () => {
      const res = await post('/api/auth/login', {
        email: expectedUser.email,
        password: expectedUser.password,
      });
      res.should.have.status(200);
    });
  });
});
