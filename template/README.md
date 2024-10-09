# CREATE_RIO_FRONTEND_appName

## Summary

This project was created using the @rio-cloud/create-frontend utility and is using Vite, TypeScript and all the goodies.

Please check these files if the parameters have been interpolated correctly (there should be no more occurrences of
`CREATE_RIO_FRONTEND_*`):

* [index.html](index.html)
* [package.json](package.json)
* [.env.production](.env.production)

Once that's done, remove this section and write your own README 🦄

_Event though it's technically ignored, please make sure to update the list of OAuth scopes in [src/](src/config.ts)._

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
- **test**
    - **integration**: All integration tests.
    - **utils**: Utility functions that can be used in integration or unit tests tests.

Note: There is no dedicated root folder for all the type files on purpose, as we believe that the typings should be
co-located to the files where they originate from. This means, that component types belong to the respective component
folder, model types belong to the respective API in the service folder, etc.
