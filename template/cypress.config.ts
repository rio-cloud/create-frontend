import { defineConfig } from 'cypress';

export default defineConfig({
    chromeWebSecurity: false,
    video: false,
    reporter: 'junit',
    reporterOptions: {
        mochaFile: 'results/cypress/trustdeck-backoffice-integration-report-[hash].xml',
        toConsole: true,
    },
    defaultCommandTimeout: 18000,
    retries: {
        runMode: 3,
        openMode: 1,
    },
    blockHosts: ['*googletagmanager.com', '*datadoghq.eu', '*sentry.io', '*menu.rio.cloud'],
    e2e: {
        setupNodeEvents(on, config) {},
        baseUrl: 'http://localhost:3000',
        specPattern: 'test/**/*.spec.ts',
        supportFile: false,
    },
});
