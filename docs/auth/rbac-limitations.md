# Role-Based Access Control (RBAC) Implementation Status

## Current State

Currently, our authentication system does not include any Role-Based Access Control (RBAC) logic. While we receive user information from Cognito, we are not yet extracting or utilizing any role or group information that might be encoded in the JWT.

## Technical Limitations

### JWT Processing

In our current NextAuth.js configuration (`src/auth.ts`), we only extract basic user information:

```typescript
profile(profile) {
  return {
    id: profile.sub,
    name: profile.name ?? profile.preferred_username,
    email: profile.email,
    image: profile.picture ?? null,
  }
}
```

### Session Type Definition

Our current session type only includes basic fields:

```typescript
declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
    error?: string
    expires?: Date
  }
}
```

## Future Implementation

### NextAuth.js Integration

To implement RBAC, we need to:

1. **Extend JWT Processing**

   - Modify the `jwt` callback in NextAuth.js to include group/role information
   - Example from NextAuth.js documentation:

   ```typescript
   callbacks: {
     async jwt({ token, account, profile }) {
       if (account && profile) {
         return {
           ...token,
           accessToken: account.access_token,
           groups: profile['cognito:groups'] || [],
           roles: profile['custom:roles'] || [],
         }
       }
       return token
     }
   }
   ```

2. **Update Session Type**

   ```typescript
   declare module 'next-auth' {
     interface Session {
       accessToken?: string
       refreshToken?: string
       error?: string
       expires?: Date
       groups?: string[]
       roles?: string[]
     }
   }
   ```

3. **Expose in Session**
   ```typescript
   callbacks: {
     async session({ session, token }) {
       return {
         ...session,
         groups: token.groups,
         roles: token.roles,
       }
     }
   }
   ```

### Cognito Configuration

To support this, we need to ensure:

1. Cognito is configured to include group/role information in the JWT
2. The appropriate claims are being passed in the token
3. The token includes the necessary scopes for group/role information

## Use Cases

Once implemented, RBAC will enable:

1. **Content Visibility Control**

   - Show/hide content based on user groups
   - Restrict access to specific sections
   - Customize UI based on user roles

2. **API Access Control**

   - Restrict API endpoints based on user groups
   - Implement fine-grained permissions
   - Control data access based on roles

3. **Feature Flags**
   - Enable/disable features based on user groups
   - Implement beta features for specific roles
   - Control access to experimental functionality

## References

- [NextAuth.js JWT Callback Documentation](https://next-auth.js.org/configuration/callbacks#jwt-callback)
- [NextAuth.js Session Callback Documentation](https://next-auth.js.org/configuration/callbacks#session-callback)
- [Cognito JWT Claims Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html)
