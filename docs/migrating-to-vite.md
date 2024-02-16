# Migrating an existing frontend project to Vite

## Add / remove npm dependencies

```shell
# add vite dependencies
npm i -D vite @vitejs/plugin-react babel-plugin-transform-vite-meta-env rollup-plugin-visualizer events @babel/preset-env @babel/preset-typescript @babel/preset-react jest-fetch-mock

# remove old dependencies
npm uninstall react-scripts react-app-rewired source-map-explorer webpack webpack-bundle-analyzer webpack-cli webpack-dev-server @webpack-cli/init html-webpack-plugin compression-webpack-plugin babel-loader css-loader less-loader file-loader html-loader raw-loader script-loader style-loader url-loader ts-loader less mini-css-extract-plugin
```

## Core Vite setup

### Copy [vite.config.ts](../template/vite.config.ts) to your project

### Switch to ESM Syntax

Vite is built on top of ESM Syntax => You should add `"type": "module"` to your package.json to tell Node that all `.js`
files are now using ESM. If you need to have CommonJS-style syntax in some files, you can rename those to `.cjs`.

### Update npm scripts in `package.json`

* Remove `eject` and `analyze` scripts as they are no longer needed.
* Update scripts `start`, `build` and `test` accordingly to use vite:

```
    "start": "vite",
    "build": "vite build",
    "test": "jest src",
```

We're not using a dedicated `analyze` script with `source-map-explorer` anymore. Instead, we're utilizing
[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer). You can see how it's configured in the
[template Vite Config file](../template/vite.config.ts).

### Move the `index.html` out of the public folder into the root

* Adapt the entry point for your index.tsx file to: `<script type="module" src="/src/index.tsx"></script>`.
* Check out [how Vite's public folder works](https://vitejs.dev/guide/assets.html#the-public-directory) / potentially
  remove the `public` directory if you don't need it.

### Update environment variables

See [the Vite Documentation](https://vitejs.dev/guide/env-and-mode.html) on environment variables.

* Rename `REACT_APP_*`properties to `VITE_*`.
* Update references in code: `process.env.REACT_APP_*` becomes `import.meta.env.VITE_*`, 
  `process.env.NODE_ENV !== 'production'` becomes `import.meta.env.DEV`, etc.
* Copy the `.env.development` into a `.env.local` for your local config (_optional, only when you need a dedicated
  local, uncommitted config_).
* Search whether your project uses the `DefinePlugin` from Webpack. Make sure those globally defined values are added
  to the vite config's `define` section (see the `APP_VERSION` value from 
  [the template's vite config](../template/vite.config.ts), for example).

### Remove your old `webpack.config.js` and all related files

## Fix source file names

Files which contain JSX code **must** be properly named `.jsx` or `.tsx`. Other build systems maybe didn't care about
this too much, but Vite / esbuild will not work when JSX code is in a file that has just a `.js` or .`ts` extension.

## Switch to relative-only paths for imports

Some frontend projects heavily rely on import aliases or automatic root imports. This _can_ be done with Vite, as well,
but maybe it's a good idea to go through your application and refactor all imports to use relative paths. This matches
the standardized default of ESM and TypeScript.

```js
// turn imports like this:
import { some, stuff } from '@/utils/blah';

// into this (with the correct amount of ../, of course)
import { some, stuff } from '../../../utils/blah';
```

## Problems with `moment` imports

Moment seems to have weird / broken exports in ESM-land. Directly importing sub-properties `from 'moment'` will not
work. Simply import the whole module and use it in your code:

```js
// before
import { isMoment } from 'moment';

const blah = isMoment(something);

// after
import moment from 'moment';

const blah = moment.isMoment(something);
```
## (optional) Switch to `oidc-client-ts`

The vite.config.ts in this template uses `oidc-client-ts` instead of `oidc-client`. It's a zero-effort drop-in
replacement with better typing. If you don't want to switch, don't forget to update the `manualChunks` entry in your
vite config where `oidc-client-ts` is mentioned.

## Update `history` package dependency

In case you're using react-router v5, you should update the `history` package to at least v5.3.0.

## Recommended: Adapt the project folder structure to the template's folder structure

This will ensure that developers feel right at home when working with your project and other projects.

## Import custom styles

In case you have custom CSS in one or more `.css` or `.less` files, you might need to add the entry to your `index.ts`
by adding a dedicated import:

```js
import 'App.css';
```

## (optional) Add dependencies for local mock

If you're using a local dev server: You might have to install dependencies like `express` and `body-parser` as
devDependencies manually. 

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
