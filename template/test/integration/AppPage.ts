import { test as base, type Locator, type Page } from '@playwright/test';

export const BASE_URL = 'http://localhost:3000/#/';

/**
 * Defines a "page object model".
 *
 * @see https://playwright.dev/docs/pom
 */
export class AppPage {
    public readonly body: Locator;
    public readonly locationMenu: Locator;
    public readonly actionBarItems: Locator;

    constructor(public readonly page: Page) {
        this.body = page.locator('.ApplicationLayoutBody');
        this.locationMenu = page.locator('.ModuleNavigation-dropdown');
        this.actionBarItems = page.locator('.ActionBarItemIcon');
    }

    async open(queryParams: Record<string, string> = {}) {
        const search = new URLSearchParams(queryParams).toString();
        await this.page.goto(`${BASE_URL}${search ? `?${search}` : ''}`);
    }

    async openServiceInfo() {
        await this.actionBarItems.first().click();
    }
}

/**
 * Extends the default Playwright `test` function with a "fixture".
 *
 * This allows specs to directly use the POM instead of having to create it every single time.
 *
 * @see https://playwright.dev/docs/test-fixtures
 */
export const test = base.extend<{ appPage: AppPage }>({
    appPage: async ({ page }, use) => await use(new AppPage(page)),
});
