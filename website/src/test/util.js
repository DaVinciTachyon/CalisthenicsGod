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
} = require('../../../util/util');

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
  await page.type(
    '[name="weight"]',
    user.weight.toString().replace(/\./g, ',')
  );
  expect(await page.$eval('[name="weight"]', (el) => el.value)).toEqual(
    user.weight.toString()
  );
  await page.click('[name="gender"]');
  await page.click(`[data-id="${user.gender}"]`);
  await page.waitForSelector(`[data-id="select-${user.gender}"]`);
  await page.click('[name="birthDate"]');
  const date = user.birthDate.toLocaleDateString().split('/').join('');
  await page.type('[name="birthDate"]', date);
  expect(await page.$eval('[name="birthDate"]', (el) => el.value)).toEqual(
    user.birthDate.toLocaleDateString().split('/').reverse().join('-')
  );

  await page.click('[data-id="registerButton"]');

  await page.waitForSelector('[data-id="registerButton"]', { hidden: true });
};

const login = async (user, page) => {
  await register(user, page);
  await page.goto(`${process.env.REACT_APP_WEBSITE_URL}/login`);
  await page.waitForSelector('[data-id="signInButton"]');

  await page.click('[name="email"]');
  await page.type('[name="email"]', user.email);
  await page.click('[name="password"]');
  await page.type('[name="password"]', user.password);

  const signInButton = await page.$('[data-id="signInButton"]');
  signInButton.click();

  await page.waitForSelector('[data-id="signInButton"]', { hidden: true });
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
  buildRandomUser,
  buildRandomExercise,
  buildRandomIngredient,
  buildRandomStage,
};
