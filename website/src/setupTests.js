import '@testing-library/jest-dom/extend-expect'
import puppeteer from 'puppeteer'

jest.setTimeout(10000)
global.url = process.env.REACT_APP_WEBSITE_URL || 'http://localhost:5000'

beforeAll(async () => {
  global.browser = await puppeteer.launch({ headless: false })
})

afterAll(() => {
  global.browser.close()
})
