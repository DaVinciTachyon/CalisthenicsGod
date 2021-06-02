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

const randomGender = () => randomOption(['male', 'female']);

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

const buildRandomExercise = async (authToken) => {
  const stageId = (await post('/workout/stage', buildRandomStage(), authToken))
    .body._id;
  return {
    name: randomString(6),
    abbreviation: randomAlphaNumeric(4),
    motionType: {
      componentExercises: randomOption([[]]), //FIXME
      transversePlane: randomOption(['upper', 'lower', 'core']),
      verticality: randomOption(['horizontal', 'vertical']),
      frontalPlane: randomOption(['push', 'pull', 'rotational', 'lateral']),
      kineticChain: randomOption(['closed', 'open']),
      motion: randomOption(['isometric', 'isotonic', 'distance', 'timed']),
      sagittalPlane: randomOption(['bilateral', 'unilateral']),
    },
    potentialStages: [stageId],
    requirements: [],
    description: randomAlphaNumeric(50),
  };
};

const buildRandomIngredient = () => ({
  name: randomLowerCaseString(5),
  macronutrients: {
    fat: randomFloat(0, 100),
    carbohydrate: randomFloat(0, 100),
    protein: randomFloat(0, 100),
    ethanol: randomFloat(0, 100),
  },
});

const buildRandomStage = () => ({
  name: randomString(6),
  description: randomString(50),
  chronologicalRanking: randomInt(),
});

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
  randomGender,
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
