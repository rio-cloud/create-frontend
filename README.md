# rio-cloud/create-frontend

A CLI for creating new web frontend projects from scratch.

**work in progress, duh.**

```shell
npm create --yes rio-cloud/frontend -- my-fancy-project
```

## Tech Stack

The RIO template is opinionated and comes already with some pre-defined libraries to give you a head start and 
streamline the various projects so devs feel familiar when working with multiple projects. If you still want to use
something else, feel free to remove or adapt the sample implementations.

- *Build Tooling*:
    - [Vite](https://vitejs.dev/) - uses [esbuild](https://esbuild.github.io/) and [Rollup](https://rollupjs.org) under
      the hood
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
    - [MSW](https://mswjs.io/) to mock API calls by intercepting requests on the network level. This can be used for
      development and testing alike
- *Localization*:
    - [react-intl](https://formatjs.io/docs/react-intl/) as I18n library
    - [Phrase](https://phrase.com/cli/) for managing translations with Phrase
- *Service Monitoring and Issue Tracking*:
    - [Sentry](https://sentry.io/)
- *Static code analysis and formatting*:
    - [ESLint](https://eslint.org/)
    - [Prettier](https://prettier.io/) for autoformatting source code
- *Automated dependency updates*:
    - [Renovate](https://docs.renovatebot.com/) basic configuration file only, further configurations must be customized

## Directory Structure

A short explanation of what each folder is meant for:

- **src**
    - **assets**: The folder for all kinds of assets, namely images videos etc.
    - **components**: All service-specific components that are used multiple times across the service. These components
      are generic and reusable. They do not relate to a certain feature. Imagine a custom input component with
      validation that is used in various features for example in different forms.
    - **configuration**: Service configuration like login, token handling, language settings, or general setup files
      like the redux store.
    - **data**: All relevant files for data definition to be used for the service; i.e. table configuration; initial
      service data or configurations, date formatter, currencies, etc.
    - **features**: The folder for all feature-relevant things. Each feature is meant to be in a dedicated subfolder
      that co-locates feature-relevant files. Examples are header, sidebars, maps, trees, user lists, tables, forms,
      etc. Features are rather isolated and don't interact with other features. This way, they are easy to replace,
      remove, or change. Features are combined on pages.
    - **hooks**: All custom hooks used across the project.
    - **layout**: The folder for the overarching layouts as defined in `App.tsx`.
    - **pages**: The folder for all navigable service pages. Pages are composed of features and components. For the
      Frontend template, these are the "intro" and "more" pages. It actually represents, what is defined in the header
      as routes. But this could also be sub-pages in some cases.
    - **routes**: All route-related files like route definitions, route updater, route hooks etc.
    - **services**: All service API connections, redux-toolkit-query APIs or thunks, io-ts converter, model types, etc.
    - **utils**: Common utility files and functions.
- **tests**
    - **integration**: All cypress integration tests.
    - **utils**: Utility functions that are used in integration tests.

Note: There is no dedicated root folder for all the type files on purpose, as we believe that the typings should be
co-located to the files where they originate from. This means, that component types belong to the respective component
folder, model types belong to the respective API in the service folder, etc.

## Migration guides for existing frontend projects

* [Migrating to Vite](docs/migrating-to-vite.md)
* [Migrating to Mock Service Worker](docs/migrating-to-msw.md)
