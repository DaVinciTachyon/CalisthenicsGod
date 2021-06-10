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

  it('Empty', async () => {
    const logInButton = await page.$('[data-id="logInButton"]');
    logInButton.click();

    await page.waitForSelector('[data-id="notification"]');
    const notification = await page.$eval(
      '[data-id="notification"]',
      (el) => el.innerHTML
    );
    expect(notification).toMatch('"email" is not allowed to be empty');
  });

  it('No password', async () => {
    await page.click('[name="email"]');
    await page.type('[name="email"]', user.email);

    const logInButton = await page.$('[data-id="logInButton"]');
    logInButton.click();

    await page.waitForSelector('[data-id="notification"]');
    const notification = await page.$eval(
      '[data-id="notification"]',
      (el) => el.innerHTML
    );
    expect(notification).toMatch('"password" is not allowed to be empty');
  });

  it('Incorrect details', async () => {
    await page.click('[name="email"]');
    await page.type('[name="email"]', user.email);
    await page.click('[name="password"]');
    await page.type('[name="password"]', randomAlphaNumeric(7));

    const logInButton = await page.$('[data-id="logInButton"]');
    logInButton.click();

    await page.waitForSelector('[data-id="notification"]');
    const notification = await page.$eval(
      '[data-id="notification"]',
      (el) => el.innerHTML
    );
    expect(notification).toMatch('Invalid Password');
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
