# RIO's create-frontend CLI

A CLI for creating new web frontend projects from scratch.

```shell
npm create --yes rio-cloud/frontend my-fancy-project
```

👉 Before starting, you should already have some information ready:

- OAuth ClientID
- OAuth redirect_uri
- OAuth silent redirect_uri
- Sentry DSN

If you **just** want a small local frontend toy project that allows you to play around with UIKIT components, simply
enter dummy values for the parameters.

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

## ⚠️ Note for Windows users ⚠️

Some of the utility we're using in this CLI does not work 100% reliable on Windows. See
[this issue](https://github.com/rio-cloud/create-frontend/issues/6), for example. We try to iron out these issues. But
you _may_ run into problems when running the CLI in a path on one drive, e.g. `C:\Users\RandomUser\code`, but then
manually setting the output directory to a path on another drive, e.g. `D:\projects\awesome-sauce`.

👉 We highly recommend running the CLI from the parent directory of your desired new project's directory. In the example
above, you're best off going into `D:\projects` and then just running
`npm create --yes rio-cloud/frontend awesome-sauce`. The CLI will automatically assume the output directory to be a
child directory of your current working dir + the project name you're giving - and you don't have to type in the path,
since the CLI will propose it automatically, and you just have to hit enter.
