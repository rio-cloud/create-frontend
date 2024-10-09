// This is the default page object model to provide utilities for the page
// See: https://playwright.dev/docs/pom

import type { Locator, Page } from '@playwright/test';

import { type QueryParams, toQueryString } from './utils';

export const BASE_URL = 'http://localhost:3000/#/';

type Selectors = {
    applicationBody: string;
    appMenu: string;
};

export const selectors: Selectors = {
    applicationBody: '.ApplicationLayoutBody',
    appMenu: '.ModuleNavigation-dropdown',
};

type AppPageType = {
    open: (options?: QueryParams) => Promise<void>;
    getApplicationBody: () => Promise<Locator>;
    getApplicationMenu: () => Promise<Locator>;
    openServiceInfo: () => Promise<void>;
};

export const AppPage = (page: Page): AppPageType => {
    const open = async (options: QueryParams | undefined): Promise<void> => {
        const params = options ? toQueryString(options) : '';
        await page.goto(`${BASE_URL}${params}`);
    };

    const getApplicationBody = async (): Promise<Locator> => page.locator(selectors.applicationBody);

    const getApplicationMenu = async (): Promise<Locator> => page.locator(selectors.appMenu);

    const openServiceInfo = async (): Promise<void> => {
        await page.locator('.ActionBarItemIcon').first().click();
    };

    return {
        open,
        getApplicationBody,
        getApplicationMenu,
        openServiceInfo,
    };
};
