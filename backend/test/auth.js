const { post, buildRandomUser, randomAlphaNumeric } = require('./util');
const chai = require('chai');
const should = chai.should();

describe('Auth', () => {
  let expectedUser;

  before(async () => {
    expectedUser = buildRandomUser();
  });

  describe('/POST register', () => {
    it('no body', async () => {
      const res = await post('/api/auth/register', {});
      res.should.have.status(400);
    });

    it('valid user', async () => {
      const res = await post('/api/auth/register', expectedUser);
      res.should.have.status(200);
    });
  });

  describe('/POST login', () => {
    it('no body', async () => {
      const res = await post('/api/auth/login', {});
      res.should.have.status(400);
    });

    it('invalid user', async () => {
      const res = await post('/api/auth/login', {
        email: expectedUser.email,
        password: randomAlphaNumeric(10),
      });
      res.should.have.status(400);
    });

    it('valid user', async () => {
      const res = await post('/api/auth/login', {
        email: expectedUser.email,
        password: expectedUser.password,
      });
      res.should.have.status(200);
    });
  });
});
