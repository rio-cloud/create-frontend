import type { Page } from '@playwright/test';

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
    const releaseNotes = page.getByText('Release notes');

    const open = async (queryParams: Record<string, string> = {}) => {
        const search = new URLSearchParams(queryParams).toString();
        if (search) {
            await page.goto(`/?${search}`);
        } else {
            await page.goto('/');
        }
    };

    const openServiceInfo = async () => {
        await actionBarItems.first().click();
    };

    return { page, body, locationMenu, actionBarItems, releaseNotes, open, openServiceInfo };
};
