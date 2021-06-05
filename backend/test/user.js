const {
  get,
  login,
  post,
  randomString,
  randomEmail,
  randomDate,
  randomGender,
} = require('./util');
const chai = require('chai');
const should = chai.should();
let authToken;

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

    it('valid user info', async () => {
      const res = await post(
        '/api/user',
        {
          name: {
            first: randomString(5),
            middle: randomString(5),
            last: randomString(5),
          },
          email: randomEmail(),
          birthDate: randomDate(new Date(1950, 0, 1)),
          gender: randomGender(),
        },
        authToken
      );
      res.should.have.status(200);
    });
  });
});
