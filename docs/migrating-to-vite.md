# Migrating an existing frontend project to Vite

## Add / remove npm dependencies

```shell
# add vite dependencies
npm i -D vite @vitejs/plugin-react babel-plugin-transform-vite-meta-env rollup-plugin-visualizer events @babel/preset-env @babel/preset-typescript @babel/preset-react jest-fetch-mock

# remove old dependencies
npm uninstall react-scripts react-app-rewired source-map-explorer webpack webpack-bundle-analyzer webpack-cli webpack-dev-server @webpack-cli/init html-webpack-plugin compression-webpack-plugin babel-loader css-loader less-loader file-loader html-loader raw-loader script-loader style-loader url-loader ts-loader less mini-css-extract-plugin
```

## Copy `vite.config.ts` to your project

## Update npm scripts in `package.json`

* Remove script `eject` as this is no longer needed.
* Update scripts `start`, `build` and `test` accordingly to use vite:

```
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest src",
```

## Move the `index.html` out of the public folder into the root

* Adapt the entry point for your index.tsx file to: `<script type="module" src="/src/index.tsx"></script>`.
* Check out [how Vite's public folder works](https://vitejs.dev/guide/assets.html#the-public-directory) / potentially
  remove the `public` directory if you don't need it.

## Remove `analyze` script

We're not using `source-map-explorer` anymore. Instead, we're utilizing
[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer). You can see how it's configured in the 
[template Vite Config file](../template/vite.config.ts). 

## Update environment variables

See [the Vite Documentation](https://vitejs.dev/guide/env-and-mode.html) on environment variables.

* Rename `REACT_APP_*`properties to `VITE_*`.
* Update references in code: `process.env.REACT_APP_*` becomes `import.meta.env.VITE_*`, 
  `process.env.NODE_ENV !== 'production'` becomes `import.meta.env.DEV`, etc.
* Copy the `.env.development` into a `.env.local` for your local config (_optional, only when you need a dedicated
  local, uncommitted config_).

## Make sure to add these to your `.gitignore`:

```
.local
.env
```

## Remove your old `webpack.config.js` and all related files

## Overall code hygiene

* Make sure all source files that contain JSX are named `.jsx` or `.tsx`.
* In case you're using react-router v5, you might update the `history` package to at least v5.3.0.
* If you're using import alias like `~/`, replace them with path imports as vite does not know any alias by default.
* Recommended: Adapt the project folder structure to the template's folder structure. This will ensure that developers
  feel right at home when working with your project and other projects.

## Import custom styles

In case you have custom CSS in one or more `.less` files, you might need to add the entry to your `index.ts` by adding a
dedicated import of your main .less file.

## Fix dev server issues

In case you're facing an error message like *"Request url is outside of Vite serving allow list"*, you might want to
add the following to your vite.config:

```javascript
export default defineConfig({
    // ....
    server: {
        // ....
        fs: {
            strict: false,
        },
    },
});
```

Optionally, change default port to your old project settings by editing the `vite.config.ts`and add the server.port:

```javascript
export default defineConfig({
    // ....
    server: {
        // ....
        port: 8090,
    },
});
```

# Migrate to Vitest

Vitest is a drop-in replacement for Babel + Jest. It shares / enhances the Vite config.

This allows test code to be compiled significantly faster while having a ton less dependencies!

## Update npm dependencies

```shell
# install vitest
npm i -D vitest vitest-fetch-mock

# remove now-obsolete stuff
npm uninstall @types/jest jest-changed-files jest-environment-jsdom jest-junit
```

## Update npm scripts 

```
"test": "vitest run",
"test:ci": "vitest run --reporter=junit --outputFile.junit=./results/junit.xml",
"test-dev": "vitest",
"coverage": "vitest run --coverage",
```

## Add vitest imports to test files (as needed)

```javascript
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
```

## Migrate from Jest (e.g. for mocking, stubbing)

Follow the [Migrating from Jest](https://vitest.dev/guide/migration.html#migrating-from-jest) guide and update your test
code accordingly.

## Update all imports to ESM

```javascript
// OLD:
import ApplicationLayout from '@rio-cloud/rio-uikit/lib/es/ApplicationLayout';

// NEW:
import ApplicationLayout from '@rio-cloud/rio-uikit/ApplicationLayout';
```

## Remove all jest configuration from your `package.json` or dedicated config files
