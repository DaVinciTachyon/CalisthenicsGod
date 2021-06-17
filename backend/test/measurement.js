const { get, login, post, randomFloat, randomString } = require('./util');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

describe('Measurements', () => {
  let authToken;
  let expectedWeight;

  before(async () => {
    authToken = await login();
    expectedWeight = randomFloat();
  });

  describe('/GET', () => {
    it('valid request', async () => {
      const res = await get('/measurement', authToken);
      res.should.have.status(200);
      expect(res.body.weight).to.not.be.an('undefined');
    });
  });

  describe('/POST', () => {
    it('valid request', async () => {
      const res = await post('/measurement', {}, authToken);
      res.should.have.status(200);
    });

    it('valid request - weight', async () => {
      const res = await post(
        '/measurement',
        { weight: expectedWeight },
        authToken
      );
      res.should.have.status(200);
    });
  });

  describe('/GET /:name', () => {
    it('valid request', async () => {
      const res = await get('/measurement/weight', authToken);
      res.should.have.status(200);
      expect(res.body.weight).to.not.be.an('undefined');
      res.body.weight.value.should.equal(expectedWeight);
    });

    it('invalid parameter', async () => {
      const res = await get(`/measurement/${randomString(5)}`, authToken);
      res.should.have.status(400);
    });
  });

  describe('/POST /:name', () => {
    it('empty body', async () => {
      const res = await post('/measurement/weight', {}, authToken);
      res.should.have.status(400);
    });

    it('valid request', async () => {
      const res = await post(
        '/measurement/weight',
        { weight: randomFloat() },
        authToken
      );
      res.should.have.status(200);
    });

    it('invalid parameter', async () => {
      const res = await post(`/measurement/${randomString(5)}`, {}, authToken);
      res.should.have.status(400);
    });
  });

  describe('/GET /:name/history', () => {
    it('valid request', async () => {
      const res = await get('/measurement/weight/history', authToken);
      res.should.have.status(200);
    });

    it('invalid parameter', async () => {
      const res = await get(
        `/measurement/${randomString(5)}/history`,
        authToken
      );
      res.should.have.status(400);
    });
  });
});
