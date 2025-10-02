# Redis Cache Handler

## Introduction

In our public data dashboard, we deploy a fully dynamic Next.js application with caching disabled. For caching, we rely entirely on the CloudFront CDN to serve static versions of the application.

For the upcoming authenticated version of the application, CDN-based caching is unsuitable due to the dynamic nature of user-specific authenticated pages and data. To address this, we will disable the CDN for the authenticated instance and leverage Next.js’s granular caching capabilities:

Public App vs. Authenticated App

The caching strategy should look like this:

Public App:

- No Next.js caching: Completely dynamic, with no reliance on Redis or Next.js cache handlers.
- Relies entirely on CDN caching for performance and cache invalidation.

Authenticated App:

- Redis for shared caching: Use a centralised Redis cache for fetch requests shared across app instances behind the load balancer.
- No route segment caching: Routes remain dynamic, but fetch caching is optimised with Redis.

---

## Implementation

We use the [`@fortedigital/nextjs-cache-handler`](https://caching-tools.github.io/next-shared-cache/) package alongside Next.js's built-in cache handling configuration (`next.config.js`) to enable a **shared cache** across all application instances within the load balancer.

### Redis Configuration

- **Redis Instance**: The Redis instance URL is read from an environment variable:
  - **Deployed Applications**: Points to a Redis instance within the AWS infrastructure.
  - **Local Development**: Install and run Redis locally. Use the [Redis Stack Server](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/mac-os/) and run it on the default port.

**Note:** Next.js does not use the shared cache in development mode (`npm run dev`). To test caching locally, build and start the application in production mode:

```bash
 npm run build
 npm run start
```

---

## Debugging

To debug caching behavior, set the following environment variable in `.env.local`:

```bash
NEXT_PRIVATE_DEBUG_CACHE=true
```
