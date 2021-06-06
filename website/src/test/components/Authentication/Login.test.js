import puppeteer from 'puppeteer';
import { buildRandomUser, register, randomAlphaNumeric } from '../../util';

let browser;
let page;
let user;

beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
  user = buildRandomUser();
  await register(user, page);
});

afterAll(() => {
  browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto(`${process.env.REACT_APP_WEBSITE_URL}/login`);
  await page.waitForSelector('[data-id="logInButton"]');
});

describe('Login', () => {
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
