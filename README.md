# rio-cloud/create-frontend

A CLI for creating new web frontend projects from scratch.

**⚠️ work in progress ⚠️**

![work in progress](https://media.giphy.com/media/toXKzaJP3WIgM/giphy.gif)

Before starting, you should already have some information ready:

- OAuth ClientID
- OAuth redirect_uri
- OAuth silent redirect_uri
- Sentry DSN

ℹ️ if you **just** want a small local frontend toy project that allows you to play around with UIKIT components, simply
enter dummy values for the parameters.

## Running the CLI

```shell
npm create --yes rio-cloud/frontend my-fancy-project
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

## Migration guides for existing frontend projects

* [Migrating to Vite](docs/migrating-to-vite.md)
* [Migrating to Mock Service Worker](docs/migrating-to-msw.md)
