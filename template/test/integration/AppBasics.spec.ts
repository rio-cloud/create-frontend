import { expect } from '@playwright/test';

import { test, BASE_URL } from './AppPage';

test.describe('App basic functionality', () => {
    test('base url', async ({ appPage, page }) => {
        await appPage.open();
        expect(page.url()).toBe(BASE_URL);
    });

    test('deep-linking', async ({ appPage, page }) => {
        await appPage.open({ foo: 'bar', skipBar: 'true' });
        expect(page.url()).toContain('?foo=bar&skipBar=true');
    });

    test('rendering the layout', async ({ appPage }) => {
        await appPage.open();
        await expect(appPage.body).toBeVisible();
    });

    test('rendering the menu', async ({ appPage }) => {
        await appPage.open();
        await expect(appPage.locationMenu).toBeVisible();
    });

    test('rendering the service info', async ({ appPage, page }) => {
        await appPage.open();
        await appPage.openServiceInfo();
        await expect(page.getByText('Release notes')).toBeVisible();
    });
});
