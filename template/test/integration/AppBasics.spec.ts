import { expect } from '@playwright/test';
import { test } from '../testSetup';

test.describe('App basic functionality', () => {
    test('base url', async ({ appPage, page }) => {
        await appPage.open();
        expect(new URL(page.url()).pathname).toBe('/');
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
        await expect(appPage.serviceInfoReleaseNotesLink).not.toBeVisible();
        await appPage.openServiceInfo();
        await expect(appPage.serviceInfoReleaseNotesLink).toBeVisible();
    });
});
