# CDD-1379 - Page Previews

**Date:** 2026-02-27

**Ticket:** https://ukhsa.atlassian.net/browse/CDD-1379?search_id=055fe61d-bee9-48d9-80bc-ffb0f1c26b76&referrer=quick-find

**Authors:** Jean-Pierre Fouche

**Impact:** Affects all pages - broad testing required

**Testing:** Comprehensive unit tests supplied. UAT needed.

**Extended PR Notes:** [task.CDD-3197-page-previews.PR.md](./task.CDD-3197-page-previews.PR.md)

## Overview

This feature adds support for rendering **preview versions of CMS pages** from the frontend when explicitly requested.

## Design

- Preview requests are routed to `/preview` with `slug` and `t` (token) query params.
- Middleware validates params, rewrites to canonical route, and injects draft headers.
- Draft mode is detected by token in query or header; fetches from `/drafts/{slug}/` endpoint.
- All preview fetches are set to `no-store` cache and `next.revalidate: 0`.
- Rendering is handled by the existing CMS catch-all route; no preview-specific renderer needed.
- Mock server supports draft endpoints for local development/testing.

## Changed Files

| File Name                                    | Change Purpose                              | Input Example                                            | Process                                                                            | Output Example                                |
| -------------------------------------------- | ------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------- |
| src/middleware.ts                            | Handle preview routing and header injection | `/preview?slug=cover&t=abc123`                           | Validates params, rewrites to `/cover`, adds `x-cms-draft-token: abc123` header    | Request to `/cover` with draft headers        |
| src/app/(cms)/[[...slug]]/page.tsx           | Render CMS page by slug                     | Route: `/cover` (rewritten), slug: `cover`               | Calls CMS helpers to fetch page data (draft or published)                          | Renders page using draft or published data    |
| src/app/utils/cms/index.ts                   | CMS helpers, cache bypass, metadata         | Slug: `cover`, searchParams: `{ t: 'abc123' }`           | Detects preview mode, applies no-cache, fetches metadata                           | Metadata and data for draft or published page |
| src/api/requests/getPageBySlug.ts            | Fetch page data, draft support              | Slug: `cover`, searchParams: `{ t: 'abc123' }`           | If draft token present, calls `/drafts/cover/` with `Authorization: Bearer abc123` | Draft page data (JSON)                        |
| src/api/requests/cms/getPages.ts             | Fetch list of pages, type safety            | N/A                                                      | Fetches and validates list of CMS pages                                            | List of pages (JSON)                          |
| src/mock-server/handlers/drafts/[...slug].ts | Mock server handler for draft endpoints     | GET `/drafts/cover/` with `Authorization: Bearer abc123` | Validates auth, returns mock draft page data                                       | Mock draft page data (JSON)                   |
| src/mock-server/index.ts                     | Register draft handler in mock server       | N/A                                                      | Adds draft handler to mock server                                                  | Draft endpoints available for local dev       |
| src/api/requests/getPageBySlug.spec.ts       | Unit tests for draft fetch logic            | Test call with slug and token                            | Asserts correct endpoint, headers, and no-cache options                            | Test passes if draft fetch logic correct      |
| src/app/utils/cms/index.spec.ts              | Unit tests for preview mode helpers         | Test searchParams with preview token                     | Asserts cache bypass and metadata propagation                                      | Test passes if helpers behave as expected     |
