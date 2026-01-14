# Non Public Set up

The non public functionality is controlled through the use of environment variables. In order to access the non-public dashboard you will need to have the following environment variables set in your `.env.local` file.

```
# Auth Environment variables.
AUTH_ENABLED=true
AUTH_SECRET=
AUTH_CLIENT_ID=
AUTH_CLIENT_SECRET=
AUTH_DOMAIN=
AUTH_CLIENT_URL=
NEXTAUTH_URL=http://localhost:3000
```

## Environment variable Description

#### AUTH_ENABLED

This is a simple toggle that enables the non-public functionality within the dashboard. This toggle is what we use to control the visibility of the sign in page and the sign in functionality.

When set to true you will be able to authenticate and view non-public pages.
When set to false you will be able to see the current public version of the dashboard.

#### AUTH_SECRET

The `AUTH_SECRET` variable is used by next-authjs to generate keys and sign/encrypt cookies. It is mandatory for production environments.

The value of the `AUTH_SECRET` should just be a random string which can be generated using the following command:

```
openssl rand -base64 32
```

Further documentation can be found [HERE](https://next-auth.js.org/configuration/options#secret)

#### NEXTAUTH_URL

This is used by authJS to identify the URL of the site. It should be set to the URL of the frontend application e.g. when running locally it will be set to:

```
NEXTAUTH_URL=http://localhost:3000
```

Further documentation can be found [HERE](https://next-auth.js.org/configuration/options#nextauth_url)

### Cognito Environment Variables

All of the following environment variables are used in the cognito provider to connect to the correct authentication identity provider and all of the values can be taken from Cognito.

Documentation is available [HERE](https://next-auth.js.org/providers/cognito#options)

#### Instructions for accessing cognito information.

1. Login to your selected AWS account
2. Go to the Cognito service
3. Select your user pool from the list of user pool names. (The user pool you want should contain your environment identifier)
   - For Client information you will want to select `App clients` from the left hand menu and then select your App client name.
   - For Domain information you should select `Domain` from the left hand menu.

#### AUTH_CLIENT_ID

This value can be retrieved from cognito in the console and is available within the cognito app client of your AWS account.

#### AUTH_CLIENT_SECRET

This value is also available within the app client in cognito.

#### AUTH_DOMAIN

This is the endpoint that is used for authenticating users via cognito. It is available from the Domain section of your cognito user pool.

#### AUTH_CLIENT_URL

This endpoint is the cognito issuer URL and will look something like this: `https://cognito-idp.{region}.amazonaws.com/{PoolId}`
