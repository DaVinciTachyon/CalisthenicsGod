const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const appUrl = process.env.APP_URL || 'http://127.0.0.1:8080';
const app = supertest(appUrl);

chai.use(chaiHttp);

const post = (url, body, callback) => {
  app
    .post(url)
    .send(body)
    .end((err, res) => callback(err, res));
};

const get = (url, callback) => {
  app.post(url).end((err, res) => callback(err, res));
};

const randomString = (
  length,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
) => {
  const string = [];
  for (let i = 0; i < length; i++)
    string.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
  return string.join('');
};

const randomLowerCaseString = (length) =>
  randomString(length, 'abcdefghijklmnopqrstuvwxyz');

const randomAlphaNumeric = (length) =>
  randomString(
    length,
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  );

const randomEmail = () =>
  randomAlphaNumeric(10) + '@' + randomString(5) + '.com';

const randomFloat = (min = 0, max = 100) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomOption = (options) =>
  options[Math.floor(Math.random() * options.length)];

const randomGender = () => randomOption(['male', 'female']);

const randomDate = (start, end = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const buildRandomUser = () => ({
  name: {
    first: randomString(5),
    middle: randomString(5),
    last: randomString(5),
  },
  email: randomEmail(),
  password: randomAlphaNumeric(10),
  weight: randomFloat(),
  birthDate: randomDate(new Date(1950, 0, 1)),
  gender: randomGender(),
});

module.exports = {
  post,
  get,
  buildRandomUser,
  randomString,
  randomLowerCaseString,
  randomAlphaNumeric,
  randomEmail,
  randomFloat,
  randomOption,
  randomGender,
  randomDate,
};
