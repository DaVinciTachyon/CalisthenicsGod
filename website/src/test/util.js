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
} = require('../../../util/util')

const getInputDate = (date) =>
  [
    date.getFullYear().toString().padStart(4, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-')

const getDateInput = (date) => date.toLocaleDateString().replace(/\//g, '')

const getLocaleNumber = (number) =>
  new Intl.NumberFormat(getLanguage()).format(number)

const getLanguage = () =>
  navigator.userLanguage ||
  (navigator.languages &&
    navigator.languages.length &&
    navigator.languages[0]) ||
  navigator.language ||
  navigator.browserLanguage ||
  navigator.systemLanguage ||
  'en'

const register = async (user, page) => {
  await page.goto(`${global.url}/register`)
  await page.waitForSelector('[name="registerButton"]')

  await page.type('[name="firstname"]', user.name.first)
  await page.type('[name="middlename"]', user.name.middle)
  await page.type('[name="lastname"]', user.name.last)
  await page.type('[name="email"]', user.email)
  await page.type('[name="password"]', user.password)
  await page.type('[name="weight"]', user.weight.toString())
  await page.click('[name="gender"]')
  await page.click(
    `[id="${await page.$eval('[name="gender"] input', (el) => el.id)}-option-${
      user.gender === 'name' ? 0 : 1
    }"]`,
  )
  await page.type('[name="birthDate"]', getDateInput(user.birthDate))
  expect(await page.$eval('[name="birthDate"]', (el) => el.value)).toEqual(
    getInputDate(user.birthDate),
  )

  await page.click('[name="registerButton"]')

  await page.waitForSelector('[name="registerButton"]', { hidden: true })
}

const login = async (user, page) => {
  await register(user, page)
  await page.goto(`${global.url}/login`)
  await page.waitForSelector('[name="logInButton"]')

  await page.click('[name="email"]')
  await page.type('[name="email"]', user.email)
  await page.click('[name="password"]')
  await page.type('[name="password"]', user.password)

  const logInButton = await page.$('[name="logInButton"]')
  logInButton.click()

  await page.waitForSelector('[name="logInButton"]', { hidden: true })
}

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
  getDateInput,
  getLocaleNumber,
  buildRandomUser,
  buildRandomIngredient,
  buildRandomStage,
}
