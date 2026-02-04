# Cognito Session Persistence Issue

## Overview

When implementing sign out functionality, we discovered that Cognito's token revocation process is separate from NextAuth.js's session management. This means that even after clearing NextAuth.js's internal session and cookies, the Cognito tokens can remain valid, allowing automatic re-authentication.

To address this, we added a direct token revocation request to Cognito's `/revoke` endpoint in our sign out flow. This request attempts to invalidate the refresh token on Cognito's side. However, we're still seeing cases where users can automatically re-authenticate after signing out, suggesting that either:

1. The token revocation isn't fully effective
2. There's another mechanism at play that we haven't identified yet

## The Problem

Our current sign out flow:

1. Revokes the access token and refresh token with Cognito
2. Clears NextAuth.js session and cookies
3. Redirects to the start page

However, Cognito's token revocation process is independent of NextAuth.js's session management. This leads to:

- Users being automatically re-authenticated after signing out
- Inconsistent state between NextAuth.js's session and Cognito's token validity
- Potential security concerns with lingering valid tokens

## Technical Details

- NextAuth.js manages its session through cookies and internal state
- Cognito manages authentication through:
  - Access tokens
  - Refresh tokens
  - Token revocation endpoints
- These systems operate independently, requiring explicit token revocation on both sides

## Current Solution

~~Our `signOut` function now:~~

- ~~1. Attempts to revoke the refresh token with Cognito first~~
- ~~2. Only proceeds with NextAuth.js sign out after successful token revocation~~
- ~~3. Includes error handling to ensure NextAuth.js cleanup even if Cognito revocation fails~~

#### Update 14/01/2026

The issue listed above has now been resolved as we no longer call the revoke endpoint. Instead we have implemented the following flow:

1. Log the user out using authJS signout functionality with `redirect = false`. This clears all token related cookies and state from the client side storage.
2. Call the dedicated cognito signout URl which terminates the Users session and signs out the user which invalidates the issued tokens. This calls the signout URL passing in the clientID and the logout_uri which redirects the user to the homepage once logged out.

The solution above handles both the cognito and the authJS token storage and ensures that they are cleared prior to attempting to redirect to the dashboard homepage.
