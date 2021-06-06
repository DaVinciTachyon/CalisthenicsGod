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
  buildRandomIngredient,
  buildRandomStage,
} = require('../../../util/util');

const getLocaleDate = (date) => date.toLocaleString().split(', ')[0];

const getInputDate = (date) =>
  [
    date.getFullYear().toString().padStart(4, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-');

const getLocaleNumber = (number) =>
  new Intl.NumberFormat(getLanguage()).format(number);

const getLanguage = () =>
  navigator.userLanguage ||
  (navigator.languages &&
    navigator.languages.length &&
    navigator.languages[0]) ||
  navigator.language ||
  navigator.browserLanguage ||
  navigator.systemLanguage ||
  'en';

const register = async (user, page) => {
  await page.goto(`${process.env.REACT_APP_WEBSITE_URL}/register`);
  await page.waitForSelector('[data-id="registerButton"]');

  await page.click('[name="firstname"]');
  await page.type('[name="firstname"]', user.name.first);
  await page.click('[name="middlename"]');
  await page.type('[name="middlename"]', user.name.middle);
  await page.click('[name="lastname"]');
  await page.type('[name="lastname"]', user.name.last);
  await page.click('[name="email"]');
  await page.type('[name="email"]', user.email);
  await page.click('[name="password"]');
  await page.type('[name="password"]', user.password);
  await page.click('[name="weight"]');
  await page.type('[name="weight"]', user.weight.toString());
  expect(await page.$eval('[name="weight"]', (el) => el.value)).toEqual(
    user.weight.toString()
  );
  await page.click('[name="gender"]');
  await page.click(`[data-id="${user.gender}"]`);
  await page.waitForSelector(`[data-id="select-${user.gender}"]`);
  await page.click('[name="birthDate"]');
  await page.type(
    '[name="birthDate"]',
    getLocaleDate(user.birthDate).replace(/\//g, '')
  );
  expect(await page.$eval('[name="birthDate"]', (el) => el.value)).toEqual(
    getInputDate(user.birthDate)
  );

  await page.click('[data-id="registerButton"]');

  await page.waitForSelector('[data-id="registerButton"]', { hidden: true });
};

const login = async (user, page) => {
  await register(user, page);
  await page.goto(`${process.env.REACT_APP_WEBSITE_URL}/login`);
  await page.waitForSelector('[data-id="logInButton"]');

  await page.click('[name="email"]');
  await page.type('[name="email"]', user.email);
  await page.click('[name="password"]');
  await page.type('[name="password"]', user.password);

  const logInButton = await page.$('[data-id="logInButton"]');
  logInButton.click();

  await page.waitForSelector('[data-id="logInButton"]', { hidden: true });
};

module.exports = {
  register,
  login,
  randomString,
  randomLowerCaseString,
  randomAlphaNumeric,
  randomEmail,
  randomFloat,
  randomInt,
  randomOption,
  randomDate,
  getInputDate,
  getLocaleDate,
  getLocaleNumber,
  buildRandomUser,
  buildRandomIngredient,
  buildRandomStage,
};
