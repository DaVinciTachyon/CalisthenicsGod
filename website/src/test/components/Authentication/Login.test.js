import { buildRandomUser, register, randomAlphaNumeric } from '../../util';

describe('Login', () => {
  let page;
  let user;

  beforeAll(async () => {
    page = await global.browser.newPage();
    user = buildRandomUser();
    await register(user, page);
  });

  beforeEach(async () => {
    page = await global.browser.newPage();
    await page.goto(`${global.url}/login`);
    await page.waitForSelector('[data-id="logInButton"]');
  });

  it('Correct details', async () => {
    await page.click('[name="email"]');
    await page.type('[name="email"]', user.email);
    await page.click('[name="password"]');
    await page.type('[name="password"]', user.password);

    const logInButton = await page.$('[data-id="logInButton"]');
    logInButton.click();

    await page.waitForSelector('[data-id="logInButton"]', { hidden: true });
  });
});
