# Next.js 14 Architecture Overview

This architecture is optimized for aggressive caching to enhance performance, using Next.js 14 with AWS deployment in a Docker container and AWS CloudFront CDN for efficient delivery. Here’s a brief overview:

1. **Next.js 14 with App Router:**
   - `forceDynamic`: Applied on all routes to prevent caching at the origin level, ensuring that cache-control settings rely entirely on CloudFront.
2. **Docker & AWS:**
   - **Docker:** Provides a consistent, portable runtime environment.
   - **AWS Deployment:** Hosting in AWS allows scalability and tight integration with CloudFront.
3. **CloudFront CDN:**
   - **Caching Strategy:**
     - **Default TTL:** A 30-day TTL for all routes ensures that cached responses are aggressively reused.
     - **Manual Cache Flush:** CMS changes require manual cache invalidation to reflect updates across cached content.
     - **Specific TTL Adjustments:** Landing page and weather alerts are set to shorter TTLs for selective, more frequent updates.

## Workflow Summary

1. **User Request → CloudFront:** If cached, the response is delivered immediately. If not, it forwards the request to Next.js.
2. **Next.js processes uncached requests dynamically,** delivering them back to CloudFront.
3. **CloudFront Caches the response** for the configured TTL, requiring manual purges for any CMS-driven content updates.

This setup ensures performance optimisation via aggressive caching, reducing server load and latency while relying on manual cache management for selective updates.
