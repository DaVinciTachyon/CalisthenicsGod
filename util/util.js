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

const randomFloat = (min = 0, max = 100, decimalPlaces = 10) =>
  Math.round(
    (Math.random() * (max - min) + min) * Math.pow(10, decimalPlaces)
  ) / Math.pow(10, decimalPlaces);

const randomInt = (min, max) => Math.floor(randomFloat(min, max));

const randomOption = (options) => options[randomInt(0, options.length)];

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
  weight: randomFloat(0, 100, 1),
  birthDate: randomDate(new Date(1950, 0, 1)),
  gender: randomOption(['male', 'female']),
});

const buildRandomExercise = () => ({
  name: randomString(6),
  abbreviation: randomAlphaNumeric(4),
  motionType: {
    transversePlane: randomOption(['upper', 'lower']),
    verticality: randomOption(['horizontal', 'vertical']),
    frontalPlane: randomOption(['push', 'pull']),
    kineticChain: randomOption(['closed', 'open']),
    motion: randomOption(['isometric', 'isotonic', 'distance']),
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

module.exports = {
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
};
