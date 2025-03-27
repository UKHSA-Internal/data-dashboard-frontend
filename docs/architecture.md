# Next.js 14 Architecture Overview

This architecture is optimized for aggressive caching to enhance performance, using Next.js 14 with AWS deployment in a Docker container. The public dashboard uses AWS CloudFront CDN for efficient delivery, while the non-public dashboard uses direct Next.js access. Here's a brief overview:

1. **Next.js 14 with App Router:**
   - `forceDynamic`: Applied on all routes to prevent caching at the origin level, ensuring that cache-control settings rely entirely on CloudFront (for public dashboard).
2. **Docker & AWS:**
   - **Docker:** Provides a consistent, portable runtime environment.
   - **AWS Deployment:** Hosting in AWS allows scalability and tight integration with CloudFront (for public dashboard).
3. **CloudFront CDN (Public Dashboard Only):**
   - **Caching Strategy:**
     - **Default TTL:** A 30-day TTL for all routes ensures that cached responses are aggressively reused.
     - **Manual Cache Flush:** CMS changes require manual cache invalidation to reflect updates across cached content.
     - **Specific TTL Adjustments:** Landing page and weather alerts are set to shorter TTLs for selective, more frequent updates.

## Workflow Summary

### Public Dashboard

1. **User Request → CloudFront:** If cached, the response is delivered immediately. If not, it forwards the request to Next.js.
2. **Next.js processes uncached requests dynamically,** delivering them back to CloudFront.
3. **CloudFront Caches the response** for the configured TTL, requiring manual purges for any CMS-driven content updates.

### Non-Public Dashboard

1. **User Request → Next.js:** Requests go directly to the Next.js server
2. **Next.js processes requests dynamically:**
   - Public endpoints can use request-level caching where appropriate
   - Endpoints requiring authorization headers must not be cached to ensure security and data freshness
3. **Dynamic Functions:** Due to the use of dynamic functions (cookies, headers, etc.), we currently only have request-level caching for public endpoints

This setup ensures performance optimisation via aggressive caching for the public dashboard while allowing for more dynamic content handling in the non-public dashboard.
