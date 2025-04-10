# API Authentication Forwarding

## Current State

Currently, none of the API endpoints consumed by the dashboard forward authentication tokens to the backend services. This means that while users are authenticated in the frontend, backend services are not receiving the necessary authentication information to validate requests.

## Technical Requirements

### Token Forwarding

We need to ensure that all API requests include:

1. The access token in the Authorization header when authentication is required
2. Any necessary Cognito-specific headers
3. Proper error handling for token-related issues

### Implementation Pattern

Our existing `client` function in `src/api/utils/api.utils.ts` should be updated to handle authentication state. The function already has an `isPublic` flag which we can use to determine when to include authentication headers.

```typescript
// src/api/utils/api.utils.ts
import { auth } from '@/auth'

export async function client<T>(
  endpoint: string,
  {
    body,
    // Defaulting all requests to public (non-authenticated) for now.
    // This may change to an opt-in approach as we build out the authenticated dashboard.
    isPublic = true,
    searchParams,
    baseUrl = getApiBaseUrl(),
    ...customConfig
  }: Options = {}
): Promise<{ data: T | null; status: number; error?: Error; headers?: Headers }> {
  const headers: HeadersInit = {
    'content-type': 'application/json',
    // Only include API key for public requests
    ...(isPublic ? { Authorization: process.env.API_KEY ?? '' } : {}),
  }

  // Get auth token for authenticated requests
  if (!isPublic) {
    const session = await auth()
    if (!session?.accessToken) {
      throw new Error('No access token available')
    }
    headers.Authorization = `Bearer ${session.accessToken}`
  }

  // Rest of existing client function...
  const fetchOptions: RequestInit & { next?: { revalidate: number; tags: string[] } } = {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    ...customConfig,
    next: {
      revalidate: authEnabled && isPublic ? customConfig.next?.revalidate ?? cacheRevalidationInterval : 0,
      tags: authEnabled && isPublic ? [cacheFetchTags.public] : [],
    },
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  // ... rest of existing implementation
}
```

Usage remains the same, but now includes auth option:

```typescript
// Public endpoint (existing behavior)
const response = await client('/api/public')

// Authenticated endpoint
const response = await client('/api/protected', { isPublic: false })
```

## Public vs Non-Public Dashboard Authentication

The `isPublic` flag is opt-in (defaults to `true`) because:

1. **Shared Endpoints**: Many API endpoints are shared between public and non-public dashboards.

2. **Selective Authentication**: Only specific endpoints in the non-public dashboard will require authentication.

3. **Backward Compatibility**: Keeping `isPublic = true` as default ensures:
   - Existing public dashboard endpoints continue to work
   - No breaking changes for shared endpoints
   - Gradual migration to authenticated endpoints

Example of endpoint categorization:

```typescript
// Shared endpoints (isPublic = true)
const geographicData = await client('/api/geographic-data')
const visualizationData = await client('/api/visualization-data')

// Non-public only endpoints (isPublic = false)
const userPreferences = await client('/api/user-preferences', { isPublic: false })
const adminSettings = await client('/api/admin-settings', { isPublic: false })
```

## Required Changes

### API Utilities

We need to update our existing `client` function to:

1. Use the existing `isPublic` flag to determine auth requirements
2. Add auth headers conditionally based on `isPublic`
3. Handle auth-related errors appropriately

## Testing Requirements

1. **Authentication Tests**

   - Verify token forwarding
   - Test unauthorized scenarios
   - Validate error handling

2. **Integration Tests**

   - Test with backend services
   - Verify token refresh flow
   - Check error propagation

## Future Considerations

1. **Monitoring**

   - Track authentication failures
   - Monitor token refresh patterns
   - Log security-related events

2. **Performance**

   - Optimize token handling
   - Implement request caching where appropriate
