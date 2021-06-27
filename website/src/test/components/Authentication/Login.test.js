import { buildRandomUser, register, randomAlphaNumeric } from '../../util'

describe('Login', () => {
  let page
  let user

  beforeAll(async () => {
    page = await global.browser.newPage()
    user = buildRandomUser()
    await register(user, page)
  })

  beforeEach(async () => {
    page = await global.browser.newPage()
    await page.goto(`${global.url}/login`)
    await page.waitForSelector('[name="logInButton"]')
  })

  it('Correct details', async () => {
    await page.type('[name="email"]', user.email)
    await page.type('[name="password"]', user.password)

    const logInButton = await page.$('[name="logInButton"]')
    logInButton.click()

    await page.waitForSelector('[name="logInButton"]', { hidden: true })
  })
})
