<h1>
  <img src="https://cdn.rio.cloud/images/favicon/apple-touch-icon.png" alt="RIO logo" width="28" />
  RIO's create-frontend CLI
</h1>

A CLI for creating new web frontend projects from scratch.

Projects created with this CLI are generated from the
[frontend-template](https://github.com/rio-cloud/frontend-template) repository.

```shell
npm create --yes rio-cloud/frontend my-new-project
```

👉 **Before starting, you should already have some information ready:**

- OAuth ClientID
- OAuth redirect_uri
- Sentry DSN

If you **just** want a small local frontend toy project that lets you experiment with UIKIT components, simply enter dummy values for the parameters.

## ⚠️ Note for Windows users ⚠️

Some of the utilities used by this CLI do not work 100% reliably on Windows. See [this issue](https://github.com/rio-cloud/create-frontend/issues/6) for an example.

We are working to improve this, but you may still run into problems if you run the CLI from a path on one drive, for example
`C:\Users\RandomUser\code`, and then manually set the output directory to a path on another drive, for example
`D:\projects\awesome-sauce`.

👉 We strongly recommend navigating to the parent folder of your desired project directory first. In the example above, the best option would be to go to `D:\projects` and then run `npm create --yes rio-cloud/frontend awesome-sauce`.

The CLI automatically assumes that the output directory will be a child directory of your current working directory, using the project name you provide. You usually do not need to type the folder path manually, because the CLI proposes it automatically. To accept the suggested path, just press Enter.

## ⚠️ Note for users that don't have SSH access to git repositories ⚠️

If the CLI fails to clone the git repository, you can add the `--https` flag to the command so that it uses HTTPS instead of SSH, for example: `npm create --yes rio-cloud/frontend my-new-project --https`.
