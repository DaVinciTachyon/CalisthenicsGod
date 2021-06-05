const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const appUrl = process.env.APP_URL || 'http://127.0.0.1:8080';
const app = supertest(appUrl);

chai.use(chaiHttp);

const post = (url, body, authToken = '', headers = {}) =>
  new Promise((resolve, reject) => {
    app
      .post(url)
      .set('auth-token', authToken)
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });

const get = (url, authToken = '', headers = {}) =>
  new Promise((resolve, reject) => {
    app
      .get(url)
      .set('auth-token', authToken)
      .set(headers)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });

const deleteRequest = (url, body, authToken = '', headers = {}) =>
  new Promise((resolve, reject) => {
    app
      .delete(url)
      .set('auth-token', authToken)
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });

const patch = (url, body, authToken = '', headers = {}) =>
  new Promise((resolve, reject) => {
    app
      .patch(url)
      .set('auth-token', authToken)
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });

const login = async () => {
  const user = buildRandomUser();
  await post('/api/auth/register', user);
  const res = await post('/api/auth/login', {
    email: user.email,
    password: user.password,
  });
  return res.body['auth-token'];
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
  randomLowerCaseString(10) + '@' + randomLowerCaseString(5) + '.com';

const randomFloat = (min = 0, max = 100) => Math.random() * (max - min) + min;

const randomInt = (min, max) => Math.floor(randomFloat(min, max));

const randomOption = (options) => options[randomInt(0, options.length)];

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

const buildRandomExercise = () => ({
  name: randomString(6),
  abbreviation: randomAlphaNumeric(4),
  motionType: {
    transversePlane: randomOption(['upper', 'lower', 'core']),
    verticality: randomOption(['horizontal', 'vertical']),
    frontalPlane: randomOption(['push', 'pull', 'rotational']),
    kineticChain: randomOption(['closed', 'open']),
    motion: randomOption(['isometric', 'isotonic', 'distance', 'timed']),
  },
  potentialStages: [],
  requirements: [],
  description: randomAlphaNumeric(50),
});

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
  const stageId = (
    await post('/api/workout/stage', buildRandomStage(), authToken)
  ).body._id;
  const exerciseId = (
    await post('/api/exercise', buildRandomExercise(), authToken)
  ).body._id;
  return {
    stages: [
      {
        id: stageId,
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
    await post('/api/nutrition/ingredients', buildRandomIngredient(), authToken)
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
      '/api/nutrition/meals/preset',
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
  randomString,
  randomLowerCaseString,
  randomAlphaNumeric,
  randomEmail,
  randomFloat,
  randomInt,
  randomOption,
  randomGender,
  randomDate,
  login,
};
