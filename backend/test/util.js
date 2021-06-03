const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const appUrl = process.env.APP_URL || 'http://localhost:8080/api';
const app = supertest(appUrl);
const {
  randomString,
  randomLowerCaseString,
  randomAlphaNumeric,
  randomEmail,
  randomFloat,
  randomInt,
  randomOption,
  randomDate,
  buildRandomUser,
  buildRandomExercise,
  buildRandomIngredient,
  buildRandomStage,
} = require('../../util/util');

chai.use(chaiHttp);

const request = (
  method,
  url,
  body = undefined,
  authToken = undefined,
  headers = {}
) =>
  new Promise((resolve, reject) => {
    if (authToken) headers['auth-token'] = authToken;
    headers['Accept'] = 'application/json';
    app[method](url)
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });

const post = (url, body, authToken = undefined, headers = {}) =>
  request('post', url, body, authToken, headers);

const get = (url, authToken = undefined, headers = {}) =>
  request('get', url, undefined, authToken, headers);

const deleteRequest = (url, body, authToken = undefined, headers = {}) =>
  request('delete', url, body, authToken, headers);

const patch = (url, body, authToken = undefined, headers = {}) =>
  request('patch', url, body, authToken, headers);

const login = async () => {
  const user = buildRandomUser();
  await post('/auth/register', user);
  const res = await post('/auth/login', {
    email: user.email,
    password: user.password,
  });
  return res.body['auth-token'];
};

const buildRandomWorkout = async (authToken) => {
  const exercise = await buildRandomExercise(authToken);
  const exerciseId = (await post('/exercise', exercise, authToken)).body._id;
  return {
    stages: [
      {
        id: exercise.potentialStages[0],
        exercises: [
          {
            id: exerciseId,
            sets: [
              {
                repetitions: randomInt(),
                time: randomInt(),
                distance: randomInt(),
                weight: randomInt(),
              },
            ],
            variation: randomOption([
              'eccentric',
              'concentric',
              'clockwise',
              'anti-clockwise',
            ]),
            sagittalPlane: randomOption(['right', 'left']),
            rest: {
              intraset: randomInt(),
              interset: randomInt(),
            },
          },
        ],
      },
    ],
  };
};

const buildRandomIngredientReference = async (authToken) => {
  const ingredientId = (
    await post('/nutrition/ingredients', buildRandomIngredient(), authToken)
  ).body._id;
  return {
    id: ingredientId,
    weight: randomFloat(),
  };
};

const buildRandomPresetMeal = async (authToken) => {
  const ingredient = await buildRandomIngredientReference(authToken);
  return {
    name: randomString(10),
    ingredients: [ingredient],
  };
};

const buildRandomPresetMealReference = async (authToken) =>
  (
    await post(
      '/nutrition/meals/preset',
      await buildRandomPresetMeal(authToken),
      authToken
    )
  ).body._id;

module.exports = {
  post,
  get,
  deleteRequest,
  patch,
  buildRandomUser,
  buildRandomExercise,
  buildRandomIngredient,
  buildRandomStage,
  buildRandomWorkout,
  buildRandomIngredientReference,
  buildRandomPresetMeal,
  buildRandomPresetMealReference,
  login,
  randomString,
  randomLowerCaseString,
  randomAlphaNumeric,
  randomEmail,
  randomFloat,
  randomInt,
  randomOption,
  randomDate,
};
