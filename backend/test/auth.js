const { post } = require('./util');
const chai = require('chai');
const should = chai.should();

const sampleUser = {
  name: {
    first: 'John',
    middle: 'Joseph',
    last: 'Doe',
  },
  email: 'john.doe@mail.com',
  password: 'johndoepassword',
  weight: 75.3,
  birthDate: new Date(),
  gender: 'male',
};

describe('Auth', () => {
  describe('/POST register', () => {
    it('it should get 400 status with no body', (done) => {
      post('/auth/register', {}, (err, res) => {
        if (err) console.error(err);
        res.should.have.status(400);
        done();
      });
    });

    it('it should get 200 status with correctly formed body', (done) => {
      post('/auth/register', sampleUser, (err, res) => {
        if (err) console.error(err);
        res.should.have.status(200);
        done();
      });
    });
  });
});
