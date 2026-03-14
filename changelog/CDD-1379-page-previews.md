# CDD-1379 - Page Previews

**Date:** 2026-02-27

**Ticket:** https://ukhsa.atlassian.net/browse/CDD-1379?search_id=055fe61d-bee9-48d9-80bc-ffb0f1c26b76&referrer=quick-find

**Authors:** Jean-Pierre Fouche

**Impact:** Affects all pages - broad testing required

**Testing:** Comprehensive unit tests supplied. UAT needed.

## Summary

Allow the front-end application to render uncached draft versions of a CMS page by requesting the **/previews** path with slug and a secure token - this constitutes a presigned URL.

## Design Approach

- Page previews and Published views must be rendered with the same logic.
- Minimal touch to existing interfaces
- No caching for page previews:
  - No Incremental Static Regeneration (ISR) for /previews route rendering - this is set unconditionally
  - No client caching on any API calls to fetch drafts from CMS
- Pages will be fetched securely through presigned URLs.
- Feature flag to enable/disable page previews. This will enable previews to be deployed in a private instance of the application; the public-facing instance will have the functionality disabled.

## Stack Flow

When a user requests a preview URL, the following flow occurs:

1. **Middleware** intercepts `/preview?...` requests, validates params, sets a cookie named `queryStringParams` (with `isPreview` and `t`), and rewrites the URL to `/preview/[slug]`.
2. **Next.js routing** matches the new `/preview/[slug]` route, handled by `src/app/(cms)/preview/[[...slug]]/page.tsx`.
3. This preview route sets `force-dynamic` to disable caching for all preview content.
4. The page component calls `getPageBySlug`, which reads the cookie to detect preview mode and token.
5. If in preview mode, `getPageBySlug` fetches draft content from the CMS using a no-cache client option and the provided token.
6. **Common rendering logic** is used for both draft and published content; only cache settings differ.

```
User Request: /preview?slug=whats-new&t=abc123
	 |
	 v
 [middleware.ts] -- set cookie, rewrite URL --> /preview/whats-new
	 |
	 v
 [preview/[[...slug]]/page.tsx] -- force-dynamic (no cache)
	 |
	 v
 [getPageBySlug] -- reads cookie, detects preview
	 |
	 v
 [Draft fetch from CMS] -- no-cache client, uses token
	 |
	 v
 [renderCmsPage.tsx] -- common rendering for draft/published
```

## Changed Files

| File Name                                      | Purpose of Change                           | Input                                                                                               | Transformations                                                                                   | Output                                                             |
| ---------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| src/middleware.ts                              | Set preview cookies, rewrite preview URLs   | Incoming request to `/preview?slug=whats-new&t=abc123`                                              | Validates params, sets cookie, rewrites to preview route                                          | Sets cookie: `{ isPreview: "true", t: "abc123" }` and rewrites URL |
| src/app/(cms)/preview/[[...slug]]/page.tsx     | Renders DRAFT (preview) content, non-cached | Request for a preview page, e.g. `/preview/whats-new?t=abc123`                                      | Uses force-dynamic to disable caching, fetches draft content, uses common rendering logic         | Draft page rendered using shared logic                             |
| src/app/(cms)/[[...slug]]/page.tsx             | Renders PUBLISHED content                   | Request for a published page, e.g. `/whats-new`                                                     | Fetches published content, uses common rendering logic                                            | Published page rendered using shared logic                         |
| src/app/(cms)/layout.tsx                       | Common layout for preview and published     | Layout file in (cms) folder, inherited by all nested routes                                         | Uses Next.js folder-based layout inheritance to share presentation for both preview and published | Consistent layout for all CMS pages (preview and published)        |
| src/app/(cms)/metadata.ts                      | Common rendering for metadata               | Metadata for preview or published route                                                             | Uses shared logic for both preview and published, adjusts metadata accordingly                    | Metadata reflects correct content                                  |
| src/app/utils/cms/index.ts                     | Integrate getPageBySlug for preview         | Calls to `getPageBySlug(urlSlug)` from CMS logic                                                    | Calls new preview-aware fetch logic                                                               | Returns correct page data                                          |
| src/app/utils/cms/renderCmsPage.tsx            | Common rendering logic for CMS pages        | Receives props for either preview or published page                                                 | No difference in rendering between draft and published; only cache annotations differ per route   | Renders draft and published content identically                    |
| src/api/requests/getSearchParamsFromCookie.ts  | Extract preview params from cookie          | Cookie containing preview params, e.g. `{ queryStringParams: '{"t":"abc123","isPreview":"true"}' }` | Parses cookie JSON, returns `{ t: "abc123", isPreview: "true" }`                                  | `{ t: "abc123", isPreview: "true" }`                               |
| src/api/requests/getPageBySlug.ts              | Add draft/preview fetch logic               | Slug and token for page fetch, e.g. `slug = "whats-new", token = "abc123"`                          | Builds draft endpoint, attaches token, fetches draft, validates schema                            | Returns draft page object if preview, else published page          |
| src/api/requests/getPageBySlug.preview.spec.ts | Add unit tests for preview/draft mode       | Unit test input: preview params `{ isPreview: 'true', t: 'token123' }`                              | Mocks cookie/token, tests draft fetch logic                                                       | `expect(result).toEqual(whatsNewParentMock)`                       |

## Configuration

Set the environment variable PAGE_PREVIEWS_ENABLED=['true' | 'false'] to set this server up for serving page previews. This will allow you to set up a private instance of the server with page previews enabled, while keeping the public instance with page previews disabled. The default value for this setting is false.
