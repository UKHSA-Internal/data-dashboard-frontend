# FRONTEND PR Report

## Diff Basis

- Branch: `task/CDD-1379-page-previews`
- Baseline: `main`
- Comparison used: `git diff main`
- Files changed: 20
- Total delta: 1012 insertions, 27 deletions

## Reviewer TL;DR

- Rendering remains unchanged and preview-agnostic.
- `/preview` is handled at middleware boundary: validate, normalize slug, rewrite to canonical route.
- Draft data source selection happens in request layer via boundary token context.
- Cache bypass is treated as caching concern (`no-store` / `revalidate: 0`) for draft detail and preview metadata list fetches.

## Changed Files (from `main`)

1. `README.md` (modified)
2. `changelog/CDD-1379-page-previews.md` (added)
3. `docs/application-architecture-report.md` (added)
4. `docs/mock-server-and-switchboard.md` (modified)
5. `docs/wagtail-cms-integration.md` (modified)
6. `src/api/requests/cms/getPages.ts` (modified)
7. `src/api/requests/getPageBySlug.spec.ts` (modified)
8. `src/api/requests/getPageBySlug.ts` (modified)
9. `src/app/(cms)/[[...slug]]/page.tsx` (modified)
10. `src/app/components/cms/pages/MetricsDocumentationChild.tsx` (modified)
11. `src/app/components/cms/pages/MetricsDocumentationParent.tsx` (modified)
12. `src/app/components/cms/pages/Topic.tsx` (modified)
13. `src/app/components/cms/pages/WhatsNewChild.tsx` (modified)
14. `src/app/components/cms/pages/WhatsNewParent.tsx` (modified)
15. `src/app/utils/cms/index.spec.ts` (modified)
16. `src/app/utils/cms/index.ts` (modified)
17. `src/middleware.ts` (modified)
18. `src/mock-server/handlers/drafts/[...slug].spec.ts` (added)
19. `src/mock-server/handlers/drafts/[...slug].ts` (added)
20. `src/mock-server/index.ts` (modified)

## Code Changes

<table style="width:100%; table-layout: fixed; border-collapse: collapse; word-wrap: break-word;">
  <thead>
    <tr>
      <th style="width:15%;">File Name</th>
      <th style="width:15%;">Purpose</th>
      <th style="width:20%;">Change</th>
      <th style="width:15%;">Input (example)</th>
      <th style="width:20%;">Process</th>
      <th style="width:15%;">Output (example)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>src/middleware.ts</td>
      <td>Request middleware (rewrite/auth/redirects)</td>
      <td>Added `/preview` validation and rewrite to canonical CMS route path; injects boundary request headers for draft token/cache bypass semantics</td>
      <td>GET /preview?slug=respiratory-viruses/covid-19&t=abc123</td>
      <td>Validate slug + t, normalize slug segments, rewrite to /&lt;normalized-slug&gt;, set x-cms-draft-token + x-cms-cache-bypass headers</td>
      <td>Browser URL stays `/preview?...`; internal route resolves as `/respiratory-viruses/covid-19` and downstream fetch layer can select draft source</td>
    </tr>
    <tr>
      <td>src/app/(cms)/[[...slug]]/page.tsx</td>
      <td>Catch-all CMS route rendering entrypoint</td>
      <td>Kept rendering path preview-agnostic; removed preview-specific slug/context logic</td>
      <td>params.slug=['respiratory-viruses','covid-19']</td>
      <td>Resolve page type from route slug; render via existing PageComponents map</td>
      <td>Draft and published responses share the same renderer path with no preview-specific component wiring</td>
    </tr>
    <tr>
      <td>src/app/utils/cms/index.ts</td>
      <td>CMS utility layer for validation/metadata/type lookup</td>
      <td>Keeps renderer behavior unchanged and applies cache-bypass options from request boundary context when generating metadata lists</td>
      <td>Rewritten preview request to `/metrics-documentation` with x-cms-cache-bypass: true header</td>
      <td>Resolve page by routed slug; detect cache-bypass mode from search params or boundary header; pass no-store overrides into metadata list fetches</td>
      <td>CMS `pages` list fetch executes with { cache:'no-store', next:{ revalidate:0 } } for metadata generation under cache-bypass mode</td>
    </tr>
    <tr>
      <td>src/api/requests/getPageBySlug.ts</td>
      <td>Slug-based CMS page resolver</td>
      <td>Added boundary-driven draft branch using route slug + draft token context and strict no-cache draft fetch</td>
      <td>getPageBySlug(['respiratory-viruses','covid-19'], { type: PageType.Topic }) during preview rewrite request</td>
      <td>Resolve draft token from explicit t or request header x-cms-draft-token; if present, fetch drafts/&lt;route-slug&gt;/; otherwise run published list/detail lookup</td>
      <td>Requests drafts/respiratory-viruses/covid-19/ with Authorization: Bearer &lt;token&gt; and no-store options without preview-specific renderer parameters</td>
    </tr>
    <tr>
      <td>src/api/requests/cms/getPages.ts</td>
      <td>CMS list-fetch request handlers</td>
      <td>Added optional request cache override support for preview metadata fetches</td>
      <td>getMetricsPages({search:'covid', page:1, requestCacheOptions:{cache:'no-store', next:{revalidate:0}}})</td>
      <td>Merge requestCacheOptions into client('pages', ...) request options</td>
      <td>pages API call honors preview cache override options</td>
    </tr>
    <tr>
      <td>src/mock-server/index.ts</td>
      <td>Mock server route registration</td>
      <td>Registered drafts API route for preview flow</td>
      <td>GET /api/drafts/cover/</td>
      <td>Route matcher directs request to drafts handler module</td>
      <td>Request is handled by handlers/drafts/[...slug].ts</td>
    </tr>
    <tr>
      <td>src/mock-server/handlers/drafts/[...slug].ts</td>
      <td>Mock drafts endpoint implementation</td>
      <td>Added authenticated draft slug handler with fixture-based responses</td>
      <td>GET /api/drafts/respiratory-viruses/covid-19/ + Authorization: Bearer test</td>
      <td>Validate auth header, normalize slug, resolve fixture/switchboard status</td>
      <td>Returns fixture payload on success, otherwise 401/404/400</td>
    </tr>
    <tr>
      <td>src/api/requests/getPageBySlug.spec.ts</td>
      <td>Tests for slug-based page lookup</td>
      <td>Added draft endpoint coverage for route-slug path and middleware-token header context</td>
      <td>Resolver call with route slug and either explicit token param or x-cms-draft-token header</td>
      <td>Execute request resolver under boundary-token draft context and assert branch behavior/failures</td>
      <td>Asserts draft endpoint, bearer token, and no-store options apply without preview renderer context wiring</td>
    </tr>
    <tr>
      <td>src/app/utils/cms/index.spec.ts</td>
      <td>CMS utility behavior tests</td>
      <td>Added preview-path assertions, including preview no-cache metadata list checks</td>
      <td>Preview metadata call for metrics/what's-new in test case</td>
      <td>Run metadata utilities in preview context and inspect list-fetch call options</td>
      <td>Asserts list fetch includes { cache:'no-store', next:{ revalidate:0 } }</td>
    </tr>
    <tr>
      <td>src/mock-server/handlers/drafts/[...slug].spec.ts</td>
      <td>Tests for mock drafts endpoint handler</td>
      <td>Added success/failure coverage for draft endpoint behavior</td>
      <td>Authorized and unauthorized draft requests in tests</td>
      <td>Exercise handler branches for valid slug, missing auth, unknown slug, and invalid slug</td>
      <td>Asserts expected status/payload (200, 401, 404, 400)</td>
    </tr>
  </tbody>
</table>

---

## End-to-End Runtime Call Stack (Preview flow)

### Plain-English summary

- The rendering pipeline is unchanged: page type is resolved, then the same existing page component is selected and rendered.
- The key change is boundary responsibility: middleware rewrites preview URLs to canonical CMS route paths and request-layer token context selects draft data source.
- In this report, "page metadata" means Next.js SEO/head metadata rendered to the browser (`title`, `description`, Open Graph, Twitter, canonical), not CMS `page.meta.*` fields.
- Middleware rewrite to canonical slug path (`/<slug>`) is internal frontend routing context only; it is not the CMS API call.
- The actual CMS call in preview mode is `GET /api/drafts/<slug>/` with `Authorization: Bearer <token>`.
- Preview mode disables caching not only for the draft detail call, but also for metadata-related CMS list calls triggered in preview context.

### Public preview request path

1. Browser calls `/preview?slug=<slug>&t=<token>`.
2. `src/middleware.ts` intercepts `/preview`:

- validates `slug` + `t`
- rewrites internally (within the frontend app) to `/<normalized-slug>`
- attaches boundary headers (`x-cms-draft-token`, `x-cms-cache-bypass`) for downstream request-layer semantics
- this is not the CMS API call; it only routes request context into SSR/page resolution

3. Dynamic CMS page route `src/app/(cms)/[[...slug]]/page.tsx`:

- resolves page type via `getPageTypeBySlug(slug, searchParams)` using the rewritten route slug

4. `src/app/utils/cms/index.ts` applies metadata/validation logic and cache-bypass controls:
   - `validateUrlWithCms(..., searchParams)`
   - metadata helpers and page-type lookups
5. `src/api/requests/getPageBySlug.ts` detects draft fetch mode using token context:

- resolves token from explicit `t` or `x-cms-draft-token` request header
- builds drafts endpoint from route slug: `drafts/<normalized-route-slug>/`
- forwards token as `Authorization: Bearer <token>`
- forces no-cache behavior (`cache: no-store`, `revalidate: 0`)

6. CMS/mocked API returns page detail payload used to render page components.

### Rendering parity (draft vs normal pages)

- Draft responses are rendered through the same dynamic renderer used for published pages.
- The only difference is data source selection in `getPageBySlug` (draft endpoint vs published list/detail lookup).
- After data is fetched, the rendering path is unchanged:
  1. `getPageTypeBySlug` resolves CMS page type from returned page payload.
  2. `src/app/(cms)/[[...slug]]/page.tsx` selects component from `PageComponents` by that type.
  3. The selected page component (`Landing`, `Topic`, `Composite`, `WhatsNew`, `Metrics`, etc.) renders exactly as in normal flow.
- This means draft API payloads are schema-compatible `PageResponse` objects and are intentionally fed into the existing component map/pipeline without a separate “preview renderer”.

### Local mock API path

1. Next request layer targets `${API_URL}/api/drafts/<slug>/`.
2. Express mock server entry `src/mock-server/index.ts` routes `GET /api/drafts/*` to drafts handler.
3. `src/mock-server/handlers/drafts/[...slug].ts`:
   - enforces bearer auth header
   - normalizes path slug
   - resolves canned fixture by slug
   - returns switchboard-driven status and page payload (or 401/404/400).

## Logical Flow

```text
User Browser
  |
  | GET /preview?slug=<slug>&t=<token>
  v
Next Middleware (src/middleware.ts)
  |
  | validate slug + t
  | rewrite -> /<normalized-slug>
  | set x-cms-draft-token/x-cms-cache-bypass headers
  v
CMS Catch-all Route (src/app/(cms)/[[...slug]]/page.tsx)
  |
  | getPageTypeBySlug(slug, searchParams)    # resolve component type from CMS payload
  v
CMS Utils (src/app/utils/cms/index.ts)
  |
  | validateUrlWithCms(..., searchParams)    # enforce slug validity against routed slug
  | getPageMetadata(..., pageType)           # browser SEO/head metadata
  | getPageBySlug(slug, searchParams)        # shared fetch entry: draft vs published
  v
Request Layer (src/api/requests/getPageBySlug.ts)
  |
  | if draft token exists (search param t or x-cms-draft-token header):
  |   buildDraftEndpoint(slug)
  |   resolveDraftToken(token)
  |   client(..., { cache: no-store, next.revalidate: 0 })
  |   responseSchema.safeParse(data)
  | else:
  |   getPages(...) -> match meta.slug
  |   getPage(id)
  v
API Target
  |----------------------------------------------|
  | Local: Express mock /api/drafts/*            |
  |   -> src/mock-server/index.ts                |
  |   -> handlers/drafts/[...slug].ts            |
  |----------------------------------------------|
  | Real: CMS drafts endpoint /api/drafts/<slug>/|
  |----------------------------------------------|
  v
PageResponse payload (same schema as normal page detail; unchanged for preview)
  |
  | page.meta.type                           # routing key into PageComponents map
  v
PageComponents map (src/app/(cms)/[[...slug]]/page.tsx; unchanged)
  |
  | Select existing component by type        # same renderer used for draft and non-draft payloads
  v
Normal page rendering pipeline (Landing/Topic/Composite/etc.; shared by preview and non-preview)
```

---

## Per-File Technical Summary

### `src/middleware.ts`

- **Change:** Added dedicated `/preview` branch with query validation, rewrite to canonical route slug path, and boundary draft-token/cache headers.
- **Behavioral effect:** Missing params return `400`; valid preview requests keep browser URL while internal route resolves to canonical slug path.

Rewrite example:

- Incoming browser URL:
  - `GET /preview?slug=respiratory-viruses/covid-19&t=abc123`
- Middleware action:
  - `NextResponse.rewrite('/respiratory-viruses/covid-19', { request: { headers: ...x-cms-* } })`
- Result:
  - Browser still shows `/preview?slug=respiratory-viruses/covid-19&t=abc123`
  - Next resolves/rendering against `/respiratory-viruses/covid-19`; downstream request layer consumes draft token context and selects draft data source.

### `src/app/(cms)/[[...slug]]/page.tsx`

- **Change:** Kept dynamic route rendering path stable and preview-agnostic after middleware rewrite-to-slug boundary design.
- **Behavioral effect:** Route selection and component rendering are unchanged for preview vs published content.

### `src/app/utils/cms/index.ts`

- **Change:** `searchParams` propagated into URL validation, metadata helpers, and page type resolution.
- **Behavioral effect:** Metadata list fetches run uncached when cache-bypass mode is active.

### `src/api/requests/getPageBySlug.ts`

- **Change:** Introduced draft fetch branch (`getDraftPage`) using boundary token context with:
  - token parsing from explicit `t` or `x-cms-draft-token` request header
  - route slug-based draft endpoint selection
  - bearer token normalization
  - route slug normalization + endpoint build
  - response schema parsing for draft payload
  - no-cache request options for draft path
- **Behavioral effect:** Draft requests bypass published list/detail lookup and fetch draft endpoint directly with uncached options.

### `src/api/requests/getPageBySlug.spec.ts`

- **Change:** Added tests for draft endpoint calls, nested route slugs, boundary header-token fallback, missing route slug failure, and invalid draft payload parsing.
- **Dependencies:** mocked `client`, logger/notFound assertions.
- **Call stack impact:** Guards core preview request contract and failure handling in request layer.

### `src/app/utils/cms/index.spec.ts`

- **Change:** Added preview-mode URL validation test coverage.
- **Dependencies:** `validateUrlWithCms`, mocked page responses.
- **Call stack impact:** Verifies behavior when preview context is passed through CMS utility layer.

### `src/mock-server/index.ts`

- **Change:** Registered `GET /api/drafts/*` route.
- **Dependencies:** new drafts handler module.
- **Call stack impact:** Enables local API path used by preview request flow.

### `src/mock-server/handlers/drafts/[...slug].ts`

- **Change:** New mock drafts handler with slug normalization, auth guard, fixture map, and status/error responses.
- **Dependencies:** switchboard state (`getSwitchBoardState`), CMS fixtures (`covid19PageMock`, `respiratoryVirusesMock`), logger.
- **Call stack impact:** Local substitute for CMS drafts API endpoint.
- **Behavioral effect:** Supports canned draft responses for:
  - `cover`
  - `respiratory-viruses/covid-19`
    plus explicit 401/404/400 fallbacks.

### `src/mock-server/handlers/drafts/[...slug].spec.ts`

- **Change:** New unit tests for success and failure scenarios in drafts handler.
- **Dependencies:** partial module mock of switchboard state using real `initialState`, fixture assertions.
- **Call stack impact:** Stabilizes mock-server contract used by preview integration.

### `docs/mock-server-and-switchboard.md`

- **Change:** Added Draft Preview Mocks section with endpoint, auth requirement, canned slugs, and fallback responses.
- **Dependencies:** reflects mock handler + route behavior.
- **Call stack impact:** Operational documentation for local dev and QA flows.

### `changelog/CDD-1379-page-previews.md`

- **Change:** New feature changelog documenting preview contract, middleware rewrite, draft fetch path, caching semantics, and tests.
- **Dependencies:** references middleware/request/utils/mock docs and tests.
- **Call stack impact:** Canonical implementation narrative for this branch.

### `docs/wagtail-cms-integration.md`

- **Change:** Added CMS Page Previews section linking to changelog.
- **Dependencies:** preview architecture and changelog.
- **Call stack impact:** Documentation entry point for CMS integration context.

### `docs/application-architecture-report.md`

- **Change:** Added refreshed architecture report, including explicit CMS draft auth header flow and middleware rewrite notes.
- **Dependencies:** synthesized from runtime modules and docs.
- **Call stack impact:** High-level architectural traceability for preview and auth-forwarding flow.

### `README.md`

- **Change:** Local environment notes clarified for API_URL usage and local real CMS setup (`http://localhost:8000`), plus port summary.
- **Dependencies:** local dev runtime (`npm run dev` mock + frontend, `npm run dev:next` real CMS option).
- **Call stack impact:** Developer onboarding/ops documentation only.

---

## Dependency Graph (Condensed)

- Preview runtime path (draft detail):
  -> `src/middleware.ts`
  -> `src/app/(cms)/[[...slug]]/page.tsx`
  -> `src/app/utils/cms/index.ts`
  -> `src/api/requests/getPageBySlug.ts`
  -> `src/api/utils/api.utils.ts` + `${API_URL}/api/drafts/<slug>/`

- Preview metadata branch (no-cache list fetches):
  -> `src/app/(cms)/[[...slug]]/page.tsx`
  -> `src/app/utils/cms/index.ts` (`getPageMetadata`)
  -> `src/api/requests/cms/getPages.ts` (`getMetricsPages` / `getWhatsNewPages` with preview `requestCacheOptions`)
  -> `src/api/utils/api.utils.ts` + `${API_URL}/api/pages`

- Local mock branch:
  -> `src/mock-server/index.ts` route
  -> `src/mock-server/handlers/drafts/[...slug].ts`
  -> fixtures under `src/mock-server/handlers/cms/pages/fixtures/page`

- Test coverage chain:
  - Request-layer tests: `src/api/requests/getPageBySlug.spec.ts`
  - CMS utility tests: `src/app/utils/cms/index.spec.ts` (includes preview no-cache assertions for `getMetricsPages` / `getWhatsNewPages` requestCacheOptions pass-through)
  - Mock endpoint tests: `src/mock-server/handlers/drafts/[...slug].spec.ts`

---

## Risk / Compatibility Notes

- Draft-mode request selection depends on boundary token context (`x-cms-draft-token` header or explicit `t` parameter) being present.
- Metadata cache-bypass behavior depends on boundary cache header (`x-cms-cache-bypass`) or legacy preview query params in helper call paths.
- Middleware preview rewrite executes before existing middleware branches.
- Mock draft auth intentionally validates only bearer header presence, not signed token semantics.

## Verification Notes (from branch context)

- TypeScript compile verified after test typing fix (`npm run tsc` passed).
- Draft mock handler tests validate success + auth + unknown slug behavior.
- Endpoint sanity checks performed against local mock server for `cover` and nested slug.
