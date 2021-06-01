const { post, buildRandomUser, randomAlphaNumeric } = require('./util');
const chai = require('chai');
const should = chai.should();

const expectedUser = buildRandomUser();

describe('Auth', () => {
  describe('/POST register', () => {
    it('it should get 400 status with no body', (done) => {
      post('/api/auth/register', {}, (err, res) => {
        if (err) console.error(err);
        res.should.have.status(400);
        done();
      });
    });

    it('it should get 200 status with correctly formed body', (done) => {
      post(
        '/api/auth/register',
        {
          name: expectedUser.name,
          email: expectedUser.email,
          password: expectedUser.password,
          weight: expectedUser.weight,
          birthDate: expectedUser.birthDate,
          gender: expectedUser.gender,
        },
        (err, res) => {
          if (err) console.error(err);
          res.should.have.status(200);
          done();
        }
      );
    });
  });

  describe('/POST login', () => {
    it('it should get 400 status with no body', (done) => {
      post('/api/auth/login', {}, (err, res) => {
        if (err) console.error(err);
        res.should.have.status(400);
        done();
      });
    });

    it('it should get 400 status with incorrect user', (done) => {
      post(
        '/api/auth/login',
        {
          email: expectedUser.email,
          password: randomAlphaNumeric(10),
        },
        (err, res) => {
          if (err) console.error(err);
          res.should.have.status(400);
          done();
        }
      );
    });

    it('it should get 200 status with correctly formed body', (done) => {
      post(
        '/api/auth/login',
        {
          email: expectedUser.email,
          password: expectedUser.password,
        },
        (err, res) => {
          if (err) console.error(err);
          res.should.have.status(200);
          done();
        }
      );
    });
  });
});
