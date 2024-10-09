import { test, expect } from '@playwright/test';

import { AppPage, BASE_URL } from './AppPage';

test.describe('App basic functionality', () => {
    test('base url', async ({ page }) => {
        const appPage = AppPage(page);
        await appPage.open();

        expect(page.url()).toBe(BASE_URL);
    });

    test('deep-linking', async ({ page }) => {
        const appPage = AppPage(page);
        await appPage.open({ foo: 'bar', skipBar: true });

        expect(page.url()).toContain(`${BASE_URL}?foo=bar&skipBar=true`);
    });

    test('rendering layout', async ({ page }) => {
        const appPage = AppPage(page);
        await appPage.open();

        expect(await appPage.getApplicationBody()).toBeVisible();
    });

    test('rendering app menu', async ({ page }) => {
        const appPage = AppPage(page);
        await appPage.open();

        expect(await appPage.getApplicationMenu()).toBeVisible();
    });

    test('rendering service info', async ({ page }) => {
        const appPage = AppPage(page);
        await appPage.open();

        await appPage.openServiceInfo();
        expect(page.getByText('Release notes')).toBeVisible();
    });
});
