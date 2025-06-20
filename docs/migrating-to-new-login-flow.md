# Migrating an existing frontend project to the new login flow

## Files to add and delete

- Delete the `src/configuration/setup/oauth.ts` file
- Add the new `src/configuration/login/index.ts` file which replaces the `src/configuration/setup/oauth.ts` file
- Add the new `src/configuration/login/mockAuthentication.ts` file
- Delete the `src/configuration/login/login.ts` file
- Add the new `src/configuration/login/userManagerConfiguration.ts` file which replaces the `src/configuration/login/login.ts` file
- Delete the `src/configuration/login/redirect.ts` file. This functionality is now part of
  `src/configuration/login/index.ts`.
- Add the new `src/configuration/setup/backgroundActions.ts` file which contains a small utility to attach an
  exception handler to floating promises
- Add the new `src/configuration/setup/__test__/sentry.test.ts` file which adds tests for the
  Sentry event filtering in the new version of the `src/configuration/setup/sentry.ts` file.

## Changed files

The following files were changed. If you didn't change the file from the template you
should be able to override the version of your project with the one from the new template.

- The `src/configuration/setup/sentry.ts` file contains additional features. Most notable the
  new `addBreadcrumbToSentry` and `filterOAuthParameters` function. The former is used by the new login
  flow to add debug information and the latter removes sensitive OAuth data from Sentry events. You should
  at least merge those two into your configuration. The new file contains many additional improvements
  that are recommended.
- In addition to the initial route the `src/configuration/login/storage.ts` now also stores
  the timestamp when the login redirect to the auth server happened. This information is useful
  for debugging Sentry issues.
- Some of the functionality from the `main` function in the `src/configuration/index.ts` file was
  moved to other files. The file now only contains the code that provides the authenticated user data to
  the different RTK slices. You can find the other functionality here:
    - The creation of the user manager, authorization mocking, event handler attaching and starting
      the login flow is part of the new `src/configuration/login/index.ts` file.
    - The setting of the `lang` attribute at the `html` element is now done in the `src/index.ts` file.
- The `src/index.ts` file contains some changes you need to merge into your version
  - Add the update of the `lang` attribute to your `App` component

    ```ts
    // We want the `<html lang>` attribute to be in sync with the language currently displayed
    useEffect(() => {
        const language = extractLanguage(userLocale);
        const htmlElement = document.documentElement;
        if (!!language && htmlElement.getAttribute('lang') !== language) {
            htmlElement.setAttribute('lang', language);
        }
    }, [userLocale]);
    ```

  - Replace the following block

    ```ts
    const isDev = import.meta.env.DEV;
    const isProd = import.meta.env.PROD;
    const isProdPreview = import.meta.env.VITE_PRODUCTION_PREVIEW;

    if ((isDev && config.enableMockServer) || isProdPreview) {
        import('../mocks/browser').then(({ startWorker }) => startWorker()).then(() => main(renderApplication));
    }

    if (window.location.href.startsWith(config.login.redirectUri as string)) {
        handleLoginRedirect();
    } else if (isProd && !isProdPreview) {
        main(renderApplication);
    }
    ```

    with

    ```ts
    const isDev = import.meta.env.DEV;
    const isProdPreview = import.meta.env.VITE_PRODUCTION_PREVIEW;
    if ((isDev && config.enableMockServer) || isProdPreview) {
        await import('../mocks/browser').then(({ startWorker }) => startWorker());
    }

    await ensureUserIsLoggedIn(renderApplication, getUserSessionHooks());
    ```

- `vite.config.ts` add the following code snippet to your vitest configuration

    ```ts
    test: {
        ...
          
        // Vitest by default uses 'test' as the mode. There is no .env file for
        // this mode. Therefore, we load the environment variables from the
        // development mode instead.
        env: loadEnv('development', process.cwd()),
    }
    ```

  and the following import: `import { loadEnv } from 'vite';`

## Recommended approach

1. Get a version of the template with the old login flow
2. Get a second version of the template with the new login flow
3. For the files that were changed or removed you should diff the version of
   your project against the version with the old login flow
4. Identify changes you did and compare them to the corresponding new file:
   - Decide if you still need those changes or if the new files already solves the problem
   - If you need the changes apply them to the new file 
5. Delete all no longer needed files (see the list above) from your project
6. Move the updated new and changed files into your project

