import { test as base } from '@playwright/test';
import { appPage } from './pom/AppPage';

/**
 * Defines the names and types of all POMs.
 */
type POMs = {
    appPage: ReturnType<typeof appPage>;
};

export const test = base.extend<POMs>({
    appPage: async ({ page }, use) => await use(appPage(page)),
});
