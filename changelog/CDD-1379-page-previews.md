# CDD-1379 - Page Previews

**Date:** 2026-02-27

**Ticket:** https://ukhsa.atlassian.net/browse/CDD-1379?search_id=055fe61d-bee9-48d9-80bc-ffb0f1c26b76&referrer=quick-find

**Authors:** Jean-Pierre Fouche

**Impact:** Affects all pages - broad testing required

**Testing:** Comprehensive unit tests supplied. UAT needed.

## Overview

This feature adds support for rendering **preview versions of CMS pages** from the frontend when explicitly requested.

The intent is:

- Allow CMS editors to open a draft page before publish.
- Route preview requests through the frontend using preview query parameters.
- Fetch preview content from the CMS **drafts API** instead of the published pages API.
- Ensure draft content is **never cached**.

---

## How to request a preview

Use the preview endpoint with the required query parameters:

- `slug`
- `t` (draft auth token)

Example:

```text
/preview?slug=cover&t=<draft-token>
```

For local development against the mock server (including draft endpoint slugs and canned responses), see [Mock Server and Switchboard: Draft Preview Mocks](../docs/mock-server-and-switchboard.md#draft-preview-mocks).

This is an explicit frontend contract. Preview mode is requested via `/preview?...` and handled in middleware.

Preview endpoint handling:

- [src/middleware.ts](../src/middleware.ts)

Behavior:

1. Validates required params (`slug` and `t`).
2. Rewrites to the canonical CMS route path (`/<slug>`) while keeping the browser URL as `/preview?...`.
3. Adds boundary request headers (`x-cms-draft-token`, `x-cms-cache-bypass`) for downstream request/cache semantics.
4. Rendering path remains unchanged; request layer chooses draft data source.

---

## How preview rendering works

### 1) Dynamic CMS route remains rendering-agnostic

The CMS catch-all page continues to render by route slug as normal:

- [src/app/(cms)/[[...slug]]/page.tsx](<../src/app/(cms)/[[...slug]]/page.tsx>)

No preview-specific renderer branch is needed.

Why there are two slug representations at the boundary:

- **Incoming query slug**: preview input in `/preview?slug=<slug>&t=<token>`.
- **Internal route slug**: canonical rewritten route `/<slug>` used by the catch-all route.

Middleware normalizes the query slug and rewrites to that canonical route path. Rendering then stays fully route-driven.

### 2) CMS helpers continue normal routing + apply cache-bypass semantics

Search params continue to flow through URL validation and metadata helpers, and cache-bypass requests apply no-cache options where required:

- [src/app/utils/cms/index.ts](../src/app/utils/cms/index.ts)

Renderer components remain preview-agnostic.

### 3) Draft fetch path calls CMS drafts API

`getPageBySlug(...)` now includes draft-specific request handling:

- [src/api/requests/getPageBySlug.ts](../src/api/requests/getPageBySlug.ts)

Key draft behavior:

- Detects draft mode via token context (`t` search param or `x-cms-draft-token` request header).
- Resolves bearer token format.
- Uses `API_URL` as the drafts API base URL.
- Calls draft endpoint:
  - `const draftsPath = 'drafts'`
  - endpoint: `${draftsPath}/${routeSlug.split('/').map(encodeURIComponent).join('/')}/`
- Uses drafts base URL helper:
  - [src/api/requests/helpers.ts](../src/api/requests/helpers.ts)

No separate drafts base/path configuration is exposed.

---

## Caching behavior for previews

Preview requests are explicitly set to **no cache** on all preview-specific CMS fetches.

In the draft request options:

```ts
{
  isPublic: false,
  cache: 'no-store',
  next: {
    revalidate: 0,
  },
}
```

Source:

- [src/api/requests/getPageBySlug.ts](../src/api/requests/getPageBySlug.ts)
- [src/app/utils/cms/index.ts](../src/app/utils/cms/index.ts)
- [src/api/requests/cms/getPages.ts](../src/api/requests/cms/getPages.ts)

This means:

- `cache: 'no-store'` disables fetch cache storage/reuse.
- `next.revalidate: 0` avoids Next.js data cache revalidation reuse for this request path.
- This is applied to the draft detail call path and metadata-related list fetches (metrics/what's-new) when cache bypass is active (boundary header or compatible preview query context).

---

## Tests and supporting updates

### Draft request coverage

- [src/api/requests/getPageBySlug.spec.ts](../src/api/requests/getPageBySlug.spec.ts)

Adds assertions that draft calls include:

- `Authorization: Bearer <token>`
- `cache: 'no-store'`
- `next.revalidate: 0`
- route-slug endpoint selection (`drafts/<route-slug>/`)

### Draft URL validation behavior

- [src/app/utils/cms/index.spec.ts](../src/app/utils/cms/index.spec.ts)

Adds coverage for preview metadata no-cache option propagation.

---

## Other files changed as part of this feature branch

- [docs/application-architecture-report.md](../docs/application-architecture-report.md)

This file was regenerated/updated during the same branch to capture current architecture notes, including preview/draft authentication flow documentation.
