# CDD-3227-tree-hydration

**Date:** 2026-03-12

**Ticket:** https://ukhsa.atlassian.net/browse/CDD-3227

**Authors:** Jean-Pierre Fouche

**Impact:** Affects all pages, affectes progressive enhancement - broad testing required

## The Problem

This change addresses a bug fix for a React hydration mismatch error that occurred during SSR and client hydration. The error was:

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

	...
		<HotReload assetPrefix="" globalError={[...]}>
			<AppDevOverlayErrorBoundary globalError={[...]}>
				<ReplaySsrOnlyErrors>
				<DevRootHTTPAccessFallbackBoundary>
					<HTTPAccessFallbackBoundary notFound={<NotAllowedRootHTTPFallbackError>}>
						<HTTPAccessFallbackErrorBoundary pathname="/respirato..." notFound={<NotAllowedRootHTTPFallbackError>} ...>
							<RedirectBoundary>
								<RedirectErrorBoundary router={{...}}>
									<Head>
									<__next_root_layout_boundary__>
										<SegmentViewNode type="layout" pagePath="layout.tsx">
											<SegmentTrieNode>
											<link>
											<RootLayout>
												<html lang="en" className="govuk-temp...">
													<body
+                           className="govuk-template__body"
-                           className="govuk-template__body js-enabled govuk-frontend-supported"
													>
									...

		at body (<anonymous>:null:null)
		at RootLayout (src/app/layout.tsx:34:7)
```

**Explanation:**
This error was caused by a mismatch between the server-rendered and client-rendered className attributes on the <body> tag. On the server, the <body> was rendered with only `govuk-template__body`, but after hydration, client-side JavaScript added `js-enabled` and `govuk-frontend-supported` classes. React expects the initial HTML to match exactly between server and client, so this difference triggered a hydration warning. The impact is broad, as it affects all pages and can obscure other real hydration issues during development. Progressive enhancement features that rely on these classes may also behave inconsistently.

## Resolution

To resolve the hydration mismatch, we updated the server-rendered `<body>` to include all classes (`govuk-template__body js-enabled govuk-frontend-supported`) so that the markup matches on both server and client at hydration time. This has eliminated the React hydration warning and ensures consistent behavior for CSS and JS that depend on these classes.

**Tradeoffs:**

- With this approach, the `js-enabled` and `govuk-frontend-supported` classes are always present, even for users with JavaScript disabled. This slightly reduces the accuracy of progressive enhancement detection, but eliminates noisy warnings and potential confusion during development.
- If strict detection of JavaScript support is required, a different approach (accepting the warning or using noscript CSS) would be needed.

**Unit Tests:**
Unit tests were added for the ClientBody component to verify that the correct classes are added to and removed from the <body> element on mount and unmount. These tests ensure that the progressive enhancement logic is still exercised and can be refactored in the future if requirements change.

**Testing:** Unit tests supplied. UAT needed.

## Files Changed

| File Name                   | Purpose of Change                                                                 | Input                                                                                | Process                                                                                                    | Output                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| src/app/layout.tsx          | Ensure consistent <body> classes for hydration; integrate ClientBody for JS logic | Server-rendered layout component. Example: `<body className="govuk-template__body">` | Added js-enabled and govuk-frontend-supported classes to <body> on server. Wrapped children in ClientBody. | Server-rendered layout with `<body className="govuk-template__body js-enabled govuk-frontend-supported">` |
| src/app/ClientBody.tsx      | Add/remove JS-only classes to <body> on client mount/unmount                      | ReactNode children. Example: `<ClientBody>...</ClientBody>`                          | useEffect adds/removes classes to document.body on mount/unmount.                                          | Children rendered; <body> has JS classes only while mounted in browser.                                   |
| src/app/ClientBody.spec.tsx | Unit tests for ClientBody behavior                                                | None (test file). Example: `render(<ClientBody>Test</ClientBody>)`                   | Renders ClientBody, checks <body> classList after mount/unmount.                                           | Test output: verifies classes are added/removed as expected.                                              |
