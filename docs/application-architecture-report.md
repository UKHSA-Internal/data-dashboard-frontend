# Data Dashboard Frontend Architecture Report

Generated: 3 March 2026

This document consolidates the architecture analysis produced from:

- `README.md`
- `docs/architecture.md`
- core runtime files under `src/app`, `src/api`, `src/lib`, and `src/mock-server`

## 1) High-Level Structure

- The application is a Next.js App Router frontend (Next 15) with server-rendered pages, route handlers, and a centralized API request layer.
- The global shell is composed in `src/app/layout.tsx`, with React Query hydration and devtools in `src/app/providers.tsx`.
- Routing concerns are separated via route groups:
  - `src/app/(pages)` for content/data pages
  - `src/app/(topics)` for topic-specific experiences (e.g., weather health alerts)
  - `src/app/(auth)` for auth entry/error/signout flows
- Cross-cutting middleware in `src/middleware.ts` handles auth/session behavior and selected rewrites.

## 2) Main Runtime Flow

- Requests enter Next.js (via CloudFront for public, or directly for non-public deployments).
- Middleware runs first (`src/middleware.ts`):
  - adds request metadata headers
  - conditionally validates/renews auth session
  - rewrites `/access-our-data` to first child CMS page
- Route/page execution then loads server components and request modules.
- Data access is centralized through `src/api/requests/*` using shared fetch logic in `src/api/utils/api.utils.ts`.
- Route handlers under `src/app/api/*` provide internal proxy/download/auth/revalidation endpoints.
- Server actions are used for mutation workflows where appropriate (feedback submission path).

## 3) Key Modules and Responsibilities

### App Composition

- `src/app/layout.tsx`: root shell (GOV.UK setup, analytics, cookie banner, providers, footer)
- `src/app/providers.tsx`: React Query client setup + streamed hydration

### Middleware and Auth

- `src/middleware.ts`: matcher config, auth gating, access-our-data rewrite logic
- `src/auth.ts`: NextAuth + Cognito configuration
- `src/lib/auth/middleware.ts`: JWT refresh + cookie renewal strategy
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth handlers exposed conditionally

### Data Access and API Layer

- `src/api/requests/helpers.ts`: base URL helpers for API/auth/feedback
- `src/api/utils/api.utils.ts`: shared fetch client (headers, cookies, revalidate/tags, response parsing)
- `src/api/requests/getPageBySlug.ts`: slug-driven CMS page lookup and typed page hydration

### CMS Draft Authentication Header Flow

- Preview is requested via the explicit frontend contract `/preview?slug=<slug>&t=<signed-token>`.
- In middleware (`src/middleware.ts`), this is internally rewritten to the canonical route `/<slug>` and request headers `x-cms-draft-token` + `x-cms-cache-bypass` are injected.
- The browser URL remains `/preview?...` while server-side rendering resolves against the rewritten route slug.
- In `src/api/requests/getPageBySlug.ts`, `resolveDraftToken` ensures the token is bearer-formatted:
  - if it already starts with `Bearer ` (case-insensitive), it is used as-is
  - otherwise it is transformed to `Bearer <token>`
- The value is then passed to the CMS drafts request as `headers.Authorization` in `getDraftPage`.
- Draft requests derive from `API_URL` (via `getApiBaseUrl`) and call the endpoint path `drafts/<slug>/`.
- This means the frontend forwards the bearer token to the CMS via the HTTP `Authorization` header on calls to the drafts endpoint (`drafts/<slug>/`).

### App API Route Handlers

- `src/app/api/proxy/**`: upstream API pass-through endpoints (charts/tables/maps/alerts/geographies)
- `src/app/api/download/**`: download-oriented proxy endpoints
- `src/app/api/revalidate/route.ts`: on-demand cache revalidation endpoint
- `src/app/api/health/route.ts`: health check endpoint

### Feature Flags, i18n, Logging

- `src/app/utils/flags.utils.ts`: server-side Unleash flag retrieval
- `src/app/i18n/index.js`: server translation instance initialization
- `src/app/i18n/client.js`: client i18n setup and hook wrapper
- `src/lib/logger.ts`: pino logger setup (pretty output in local node runtime)

### Local Development Mocking

- `src/mock-server/index.ts`: Express mock API server used in local dev
- `package.json` scripts run Next.js and mock server in parallel (`npm run dev`)

## 4) Caching and Environment Behavior

- Caching behavior is controlled through env-driven constants in `src/config/constants.ts`:
  - `AUTH_ENABLED`
  - `CACHING_V2_ENABLED`
  - public/non-public revalidation defaults
- Shared cache handler can be enabled in `next.config.js`.
- `cache-handler.mjs` attempts Redis-backed shared cache and falls back to local LRU cache if Redis is unavailable.
- Fetch-level cache decisions are applied in `src/api/utils/api.utils.ts` via `next.revalidate` and tags.
- `POST /api/revalidate` supports on-demand invalidation with secret verification.

## 5) General Architecture Diagram

```text
Browser
  |
  v
CloudFront (public deployment path) / Direct Next.js (non-public path)
  |
  v
Next.js App Router
  |- Global shell + providers: layout/providers
  |- Route groups: (pages), (topics), (auth)
  |- Middleware: auth/session renewal + redirects
  |
  +--> Server Components / Pages
  |      |
  |      +--> src/api/requests/* (typed request modules)
  |              |
  |              +--> src/api/utils/client(fetch)
  |                      |
  |                      +--> External APIs (CMS, charts/tables/maps, suggestions, auth)
  |
  +--> src/app/api/* route handlers
  |      |- proxy/*
  |      |- download/*
  |      |- auth/[...nextauth]
  |      |- revalidate
  |
  +--> Server Actions (feedback submit path)
  |
  +--> Cross-cutting: i18n, feature flags, logging

Cache layer
  |- Next data cache/revalidate controls (per request)
  |- Optional shared handler (Redis -> LRU fallback)
  |- CDN caching policy for public dashboard
```

## 6) Request/Caching Path Diagram

```text
User Request
  |
  +--> Public deployment:
  |      Browser -> CloudFront (long TTL policy) -> Next.js origin (on miss)
  |
  +--> Non-public deployment:
         Browser -> Next.js directly

Inside Next.js
  |
  +--> Middleware (src/middleware.ts)
  |      - Adds headers
  |      - Auth/session renewal when enabled
  |      - Special rewrite for /access-our-data
  |
  +--> Route/Page execution
         |
         +--> Server Components call request modules
         |      (src/api/requests)
         |          |
         |          +--> Shared fetch client
         |                 (src/api/utils/api.utils.ts)
         |                 - Adds API key header
         |                 - Adds local switchboard cookie in SSR dev
         |                 - Sets next.revalidate and tags per env/route type
         |
         +--> API route handlers (proxy/download/auth/revalidate)
                (src/app/api)
                |
                +--> Proxy to upstream APIs or trigger cache invalidation

Cache Decision Path (in fetch client)
  |
  +--> If CACHING_V2_ENABLED=true:
  |      revalidate = public default interval
  |
  +--> Else if AUTH_ENABLED=true and request is public:
  |      revalidate = request override OR non-public default interval
  |
  +--> Else:
         revalidate = 0 (no Next data-cache reuse)

Shared Cache Backend (optional)
  |
  +--> Next.js cache handler enabled in next.config.js
         |
         +--> Redis-backed handler in cache-handler.mjs
         +--> Falls back to in-memory LRU if Redis unavailable

Manual/On-demand Revalidation
  |
  +--> POST /api/revalidate with secret
         -> revalidatePath("/", "layout")
```

## 7) Notes and Observations

- Current route-level dynamic rendering settings are largely `dynamic = 'auto'` in key areas (rather than universally force-dynamic).
- The request layer is intentionally centralized, which keeps auth headers, cookie forwarding (for local switchboard), and cache semantics consistent.
- CMS page rendering follows a two-step pattern in places: list pages, match slug, then fetch full page detail by ID.
- For draft CMS content, bearer authentication is forwarded explicitly by setting `Authorization: Bearer <token>` in the request headers to the CMS drafts API.
