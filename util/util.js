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

const randomFloat = (min = 0, max = 100) => Math.random() * (max - min) + min;

const randomInt = (min, max) => Math.floor(randomFloat(min, max));

const randomOption = (options) => options[randomInt(0, options.length)];

const randomDate = (start, end = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

module.exports = {
  randomString,
  randomLowerCaseString,
  randomAlphaNumeric,
  randomEmail,
  randomFloat,
  randomInt,
  randomOption,
  randomDate,
};
