# Migrating an existing frontend project to Mock Service Worker (MSW)

## Add MWS dependency to package.json:

```shell
npm i -D msw
```

## Create `mockServiceWorker.js`

This will generate the actual Service Worker code. Commit this file to your repository, but make sure not to change it
manually:

```shell
npx msw init ./public
```

## Start using MSW

Create `mocks/browser-mock.ts` and appropriate handler files. See the
[MSW documentation](https://mswjs.io/docs/getting-started/mocks) to learn how to migrate your existing API mocks.

To prevent MSW (and mock handler) code from ending up in your production bundle, you need to enable Vite to 
conditionally load it only in dev mode. Add this to your `index.tsx`:

```typescript
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
```
