import { type Page, test as base } from '@playwright/test';

export const BASE_URL = 'http://localhost:3000/#/';

/**
 * Creates a "page object model" (POM).
 *
 * Please note that we're explicitly not using classes for our POMs, so you need to make sure to use this without the
 * "new" keyword.
 *
 * @see https://playwright.dev/docs/pom
 */
export const appPage = (page: Page) => {
    const body = page.locator('.ApplicationLayoutBody');
    const locationMenu = page.locator('.ModuleNavigation-dropdown');
    const actionBarItems = page.locator('.ActionBarItemIcon');

    const open = async (queryParams: Record<string, string> = {}) => {
        const search = new URLSearchParams(queryParams).toString();
        await page.goto(`${BASE_URL}${search ? `?${search}` : ''}`);
    };

    const openServiceInfo = async () => {
        await actionBarItems.first().click();
    };

    return { page, body, locationMenu, actionBarItems, open, openServiceInfo };
};

export type AppPage = ReturnType<typeof appPage>;

/**
 * Extends the default Playwright `test` function with a "fixture".
 *
 * This allows specs to directly use the POM instead of having to create it every single time.
 *
 * @see https://playwright.dev/docs/test-fixtures
 */
export const test = base.extend<{ appPage: AppPage }>({
    appPage: async ({ page }, use) => await use(appPage(page)),
});
