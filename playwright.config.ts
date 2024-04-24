import { defineConfig, devices } from '@playwright/test';
export const STORAGE_STATE = 'setup.json'
import dotenv from 'dotenv';
import path from 'path';


// Read from default ".env" file.
dotenv.config();

require('dotenv').config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60 * 1000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],['json', {outputFile: 'jsonreport/jsonreport.json'}],['junit', {outputFile: 'jnuitreport/test-results.xml'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.edgewordstraining.co.uk/demo-site/',

    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',

    // Record trace only when retrying a test for the first time.
    trace: 'on-first-retry',

    // Record video only when retrying a test for the first time.
    video: 'retain-on-failure',

    launchOptions: {slowMo: 1000},
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
      teardown: 'teardown',
      use: {
        viewport: null,
        launchOptions:{args:['--start-maximized']},
      }
    },

    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/,
      use: {
        storageState: STORAGE_STATE,
        viewport: null,
        launchOptions:{args:['--start-maximized']},
      }
    },

    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions:{args:['--start-maximized']},
        storageState: STORAGE_STATE,

       },
       dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions:{args:['--start-maximized']},
        storageState: STORAGE_STATE,

      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions:{args:['--start-maximized']},
        storageState: STORAGE_STATE, 
      },
      dependencies: ['setup'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
