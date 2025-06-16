The web-app uses an [OIDC authentication code flow](https://openid.net/specs/openid-connect-basic-1_0.html#CodeFlow)
to obtain access tokens for the backend API from the RIO auth server. The
implementation uses the [oidc-client-ts](https://authts.github.io/oidc-client-ts/index.html)
library, which handles the low level details of the OIDC flows.

The library also provides the ability to perform a silent signin, which is an
authorization code flow with `prompt=none` within an iframe. This doesn't
require any user interaction, but only works if there is already a valid session
with the auth server. This feature is also used for refreshing tokens, because
the authentication server doesn't provide a refresh token.

There are some additional features the frontend template adds:

- We initially try a silent signin. If the user is already logged in at the auth
  server, this happens completely in the background and doesn't require any user
  interaction.
- We store the initial route in the local storage, to be able to redirect to the
  route the user entered, instead of only showing a fixed page after the login
  redirect.
- The oidc library stores the OIDC state value in the local storage, and
  compares it later on with the state that comes back from the auth server. If
  it is not the same something unexpected happened in the meanwhile (like
  another login in another tab). In this case we perform a full page reload of
  the saved initial route.

The following image shows the whole login flow how it is implemented in the RIO
frontend template

![frontend template login flow](assets/login_flow.svg)

