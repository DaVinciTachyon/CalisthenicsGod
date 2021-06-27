import { buildRandomUser, getInputDate, getDateInput } from '../../util'

describe('Register', () => {
  let page

  beforeEach(async () => {
    page = await global.browser.newPage()
    await page.goto(`${global.url}/register`)
    await page.waitForSelector('[name="registerButton"]')
  })

  it('Valid details', async () => {
    const user = buildRandomUser()
    await page.type('[name="firstname"]', user.name.first)
    await page.type('[name="middlename"]', user.name.middle)
    await page.type('[name="lastname"]', user.name.last)
    await page.type('[name="email"]', user.email)
    await page.type('[name="password"]', user.password)
    await page.type('[name="weight"]', user.weight.toString())
    await page.click('[name="gender"]')
    await page.click(
      `[id="${await page.$eval(
        '[name="gender"] input',
        (el) => el.id,
      )}-option-${user.gender === 'name' ? 0 : 1}"]`,
    )
    await page.type('[name="birthDate"]', getDateInput(user.birthDate))
    expect(await page.$eval('[name="birthDate"]', (el) => el.value)).toEqual(
      getInputDate(user.birthDate),
    )

    await page.click('[name="registerButton"]')

    await page.waitForSelector('[name="registerButton"]', { hidden: true })
  })
})
