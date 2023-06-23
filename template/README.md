# vite-rio-template

## Summary
This is the RIO TypeScript template for building new RIO services based on Vite as build tooling.


## How to create a new project
Create a new service app with this template via [degit](https://www.npmjs.com/package/degit):

```
npx degit rio-cloud/vite-rio-template my-rio-service-web
```

Or clone the project manually.

### How to configure your new project
- Update the `package.json` to set the application name.
- (Optional) Rename the `.env.development` into a `.env.local` for your local config and adapt it to your needs in case you do not want to track these changes by git.
    See https://vitejs.dev/guide/env-and-mode.html#env-files for details on *.env* Files
- (Optional) Change the dev server port in `vite.config.ts` to your likings. In case you change it, don't forget to update it in the `package.json` for the `cypress-ci` script as well as in your `.env.local` config.

- #### Production configuration
    - Request a Sentry token to use Sentry in production. Add it to the `.env.production` config file.
    - Define the redirect url for your service in `.env.production`.
    - Request and supply your App's `client_id` as well as the needed OAuth scopes in `src/config.ts`.

---

## Tech Stack
The RIO template is opinionated and comes already with some pre-defined libraries to give you a head start and streamline the various projects so devs feel familiar when working with multiple projects. If you still want to use something else, feel free to remove or adapt the sample implementations.

- *Build Tooling*:
    - [Vite](https://vitejs.dev/) - that uses [esbuild](https://esbuild.github.io/) and [Rollup](https://rollupjs.org) under the hood
- *Frontend Library*:
    - [React](https://reactjs.org/)
- *Routing*:
    - [React Router](https://github.com/remix-run/react-router)
- *State Management*:
    - [Redux Toolkit](https://redux-toolkit.js.org/)
- *Data Fetching*:
    - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) since it is within the same ecosystem as Redux
- *UI component library*:
    - [RIO UIKIT](https://uikit.developers.rio.cloud)
- Form validation
    - [React Hook Form](https://react-hook-form.com/)
- *Testing*
    - [Vitest](https://vitest.dev//) as test runner and testing framework for unit tests
    - [Testing Library](https://testing-library.com/) as the testing utility
    - [Cypress](https://www.cypress.io/) as integration, end-to-end, monitoring test suite
- *API Mocking*:
    - [MSW](https://mswjs.io/) mock API calls by intercepting requests on the network level. This can be used for development and testing alike.
- *Localization*:
    - [react-intl](https://formatjs.io/docs/react-intl/) as I18n library
    - [Phrase](https://phrase.com/cli/) managing translations. To fetch translations, the Phrase CLI is used
- *Service Monitoring and Issue Tracking*:
    - [Sentry](https://sentry.io/)
- *Static code analysis and formatting*:
    - [ESLint](https://eslint.org/)
    - [Prettier](https://prettier.io/) for autoformatting source code
- *Automated dependency updates*:
    - [Renovate](https://docs.renovatebot.com/) basic configuration file only, further configurations must be customized.
  
## Folder Structure
A short explanation of what each folder is meant for:

- **src**
    - **assets**: The folder for all kinds of assets, namely images videos etc.
    - **components**: All service-specific components that are used multiple times across the service. These components are generic and reusable. They do not relate to a certain feature. Imagine a custom input component with validation that is used in various features for example in different forms.
    - **configuration**: Service configuration like login, token handling, language settings, or general setup files like the redux store
    - **data**: All relevant files for data definition to be used for the service; i.e. table configuration; initial service data or configurations, date formatter, currencies, etc.
    - **features**: The folder for all feature-relevant things. Each feature is meant to be in a dedicated subfolder that co-locates feature-relevant files. Examples are header, sidebars, maps, trees, user lists, tables, forms, etc. Features are rather isolated and don't interact with other features. This way, they are easy to replace, remove, or change. Features are combined on pages.
    - **hooks**: All custom hooks used across the project
    - **layout**: The folder for the overarching layouts as defined in App.tsx
    - **pages**: The folder for all navigable service pages. Pages are composed of features and components. For the Frontend template, these are the "intro" and "more" pages. It actually represents, what is defined in the header as routes. But this could also be sub pages in some cases.
    - **routes**: All route-related files like route definitions, route updater, route hooks etc.
    - **services**: All service API connections, redux-toolkit-query APIs or thunks, io-ts converter, model types, etc.
    - **utils**: Common utility files and functions
- **tests**
    - **integration**: all cypress integration tests
    - **utils**: utility functions that are used in integration tests

Note, there is no dedicated root folder for all the type files on purpose, as we believe that the typings should be co-located to the files where they originate from. This means, that component types belong to the respective component folder, model types belong to the respective API in the service folder, etc.


## Migrate existing projects to Vite
- Add vite dependencies to jour project
    ````
    npm i -D vite @vitejs/plugin-react babel-plugin-transform-vite-meta-env rollup-plugin-visualizer events @babel/preset-env @babel/preset-typescript @babel/preset-react jest-fetch-mock
    ````
- Remove old dependencies
    ````
    npm uninstall react-scripts react-app-rewired source-map-explorer webpack webpack-bundle-analyzer webpack-cli webpack-dev-server @webpack-cli/init html-webpack-plugin compression-webpack-plugin babel-loader css-loader less-loader file-loader html-loader raw-loader script-loader style-loader url-loader ts-loader less mini-css-extract-plugin
    ````
- Copy `vite.config.ts` to your project
- Update package.json scripts
    - Remove script `eject` as this is no longer needed
    - Update scripts `start`, `build` and `test` accordingly to use vite
    ````
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest src",
    ````
- Move the `index.html` out of the public folder into the root. 
    - Adapt the entry point for your index.tsx file to: `<script type="module" src="/src/index.tsx"></script>`
    - Remove the public folder
    - Adapt the CICD scripts accordingly
- Remove `analyze` script for not using "source-map-explorer" but rather "rollup-plugin-visualizer". Later is already configured in `vite.config.ts`
- Replace node environment variables with vite imports
    - `process.env.REACT_APP_*` to `import.meta.env.VITE_*`
    - `process.env.NODE_ENV !== 'production'` with `import.meta.env.DEV`
- Rename REACT_APP_* config variables to VITE_*
    - Update .env.production and .env.development file as well as src/config.ts plus all occurrences in your code
- Copy the `.env.development` into a `.env.local` for your local config.
- Add files to your .gitignore
    ````
    .local
    .env
    stats.html
    ````
- Remove your old `webpack.config.js` and all related files
- Rename .js or .ts files to .jsx or .tsx in case they are React components and contain JSX syntax
    Helper code to rename all files inside a folder to tsx
    ```for f in *.ts; do mv -- "$f" "${f%.ts}.tsx"; done```
- In case you have custom CSS in one or more .less files, you might need to add the entry to your index.ts by adding a dedicated import of your main .less file
- In case you'll face an error message like *"Request url is outside of Vite serving allow list"*, you might want to add the following to your vite.config:
    `````
    export default defineConfig({
        // ....
        server: {
            // ....
            fs: {
                strict: false,
            },
        },
    });
    `````
- Optionally, change default port to your old project settings by editing the `vite.config.ts`and add the server.port
    ````
    export default defineConfig({
        // ....
        server: {
            // ....
            port: 8090,
        },
    });
    ````
- In case you use react-router v5, you might update the `history` package to min v5.3.0
- If you use import alias like '~/', replace them with path imports as vite does not know any alias by default
- Recommended: Adapt the project folder structure to the template folder structure. This will ensure that developers feel right at home when working with your project and other projects.

### Migrate to Vitest
- Vitest is a replacement for Jest to work with EcmaScript Modules and eliminate the need for Babel.
- Add the following Vitest dev dependencies:
    ````
    npm i -D vitest vitest-fetch-mock
    ````
- Update the test scripts in your `package.json` to use vitest
    ````
    "test": "vitest run",
    "test:ci": "vitest run --reporter=junit --outputFile.junit=./results/junit.xml",
    "test-dev": "vitest",
    "coverage": "vitest run --coverage",
    ````
- Add the respective vitest imports to your text files
    ````
    import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
    ````
- Replace all `jest` instances from your test code like `jest.mock()` with `vi.mock()`
- Update all UIKIT component imports to use EcmaScript Module imports like:
    `````
    // OLD:
    import ApplicationLayout from '@rio-cloud/rio-uikit/lib/es/ApplicationLayout';

    // NEW:
    import ApplicationLayout from '@rio-cloud/rio-uikit/ApplicationLayout';
    `````

- Remove all Jest and Babel dependencies
    ````
    npm uninstall @types/jest jest-changed-files jest-environment-jsdom jest-junit
    ````
- Remove all jest configuration from your `package.json` or dedicated config files

### Migrate to Mock Service Worker (MSW)
- Add MWS dependency to package.json
    ````
    npm i -D msw
    ````
- Copy the provided `mockServiceWorker.js` file from the vite-template or from the MSW documentation to your project
- Start the service worker from your application in dev mode. Add the following to your index.tsx. Note: when server worker is not dynamically loaded it will be added to your build bundle.
    ````
    if (import.meta.env.DEV && config.enableMockServer) {
        import('../mocks/serviceMock').then(({ worker }) => {
            worker.start();
            main(renderApplication);
        });
    }

    if (window.location.href.startsWith(config.login.redirectUri as string)) {
        handleLoginRedirect();
    } else if (import.meta.env.PROD) {
        main(renderApplication);
    }
    ````
- Copy the `mocks/serviceMock.ts` from the vite template to your project
- Create handler files and move old express dev-server-mocks to the new handlers and replace require imports
