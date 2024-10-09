import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './test/integration',

    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html', { open: 'never', outputFolder: './results/playwright' }],
        ['list'],
        ['junit', { outputFile: './results/playwright/junit.xml' }],
    ],

    timeout: 60_000,

    expect: {
        timeout: 24_000,
    },

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'http://127.0.0.1:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        // Set the browser to Chromium (or another supported browser)
        //browserName: 'chromium',

        // Allow running in headless mode
        headless: true,

        // Set the viewport size
        viewport: { width: 1280, height: 720 },

        ignoreHTTPSErrors: true,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'npm run start',
        env: {},
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
    },
});
