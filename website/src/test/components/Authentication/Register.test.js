import { buildRandomUser, getInputDate } from '../../util';

describe('Register', () => {
  let page;

  beforeEach(async () => {
    page = await global.browser.newPage();
    await page.goto(`${global.url}/register`);
    await page.waitForSelector('[data-id="registerButton"]');
  });

  it('Empty', async () => {
    const registerButton = await page.$('[data-id="registerButton"]');
    registerButton.click();

    await page.waitForSelector('[data-id="notification"]');
    const notification = await page.$eval(
      '[data-id="notification"]',
      (el) => el.innerHTML
    );
    expect(notification).toMatch('"name.first" is required');
  });

  it('Valid details', async () => {
    const user = buildRandomUser();
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
      user.birthDate.toISOString().replace(/-/g, '')
    );
    expect(await page.$eval('[name="birthDate"]', (el) => el.value)).toEqual(
      getInputDate(user.birthDate)
    );

    await page.click('[data-id="registerButton"]');

    await page.waitForSelector('[data-id="registerButton"]', { hidden: true });
  });
});
