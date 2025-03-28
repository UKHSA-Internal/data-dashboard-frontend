# Future Plans for Next.js Architecture

We are planning to enhance our Next.js architecture by removing CloudFront and re-enabling request-level caching for the public dashboard. The non-public dashboard is already using this architecture, which has proven effective for handling authenticated requests and dynamic content.

## Current State (Non-Public Dashboard)

The non-public dashboard currently uses this architecture:

1. **Direct Next.js Access:**

   - Requests go directly to the Next.js server
   - No CDN layer between user and server
   - Immediate authentication validation

2. **Request-Level Caching:**

   - Due to dynamic functions (cookies, headers, etc.), we currently only have request-level caching for public endpoints
   - Endpoints requiring authorization headers must not be cached to ensure security and data freshness
   - Allows for per-user content and authentication state
   - Maintains security while providing performance benefits
   - We do not use page-level caching because:
     - Pages contain dynamic data that requires fresh fetches
     - Authentication state needs to be checked on every request
     - User-specific content must be generated dynamically
     - Dynamic functions (cookies, headers) prevent static page generation
   - **Redis Integration:** Currently used to handle cached data across the load balancer, ensuring consistent performance across multiple containers

3. **Dynamic Content Handling:**

   - Efficient handling of authenticated requests
   - Immediate content updates without cache invalidation
   - Better user experience for authenticated users

4. **Current Performance Considerations:**
   - Whilst effective for security and dynamic content, there is a significant performance hit on page load times
   - This is expected given the minimal caching strategy currently in place
   - Future optimization efforts should focus on:
     - Implementing ISR (Incremental Static Regeneration) for static content
     - Exploring PPR (Partial Prerendering) once stable in Next.js 14
     - Optimizing data fetching patterns and component boundaries
   - References:
     - [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)
     - [Next.js PPR RFC](https://github.com/vercel/next.js/discussions/54908)
     - [Next.js Performance Optimization Guide](https://nextjs.org/docs/app/building-your-application/optimizing)

## Planned Changes (Public Dashboard)

1. **Removal of CloudFront:**

   - Simplifies our architecture and reduces complexity
   - Eliminates CDN latency, allowing direct requests to Next.js
   - Matches the successful architecture of the non-public dashboard

2. **Re-enabling Request-Level Caching:**

   - Utilises Next.js's built-in caching mechanisms to improve response times for dynamic routes
   - **Redis Integration:** Will use the same Redis setup as the non-public dashboard for shared caching across multiple containers in the load balancer
   - Endpoints requiring authorization headers will not be cached, following the same security principles as the non-public dashboard
   - Page-level caching will be selectively implemented for truly static content only

3. **Incremental Static Regeneration (ISR):**

   - ISR will be reactivated, allowing us to update static content without a full rebuild
   - Allows for caching of dynamic pages, enabling efficient content delivery
   - Will help mitigate the performance impact of removing CloudFront

4. **CMS Integration for On-Demand Purges:**

   - Hooking up the caching strategy to our CMS for instant purging of outdated content, now managed directly without CloudFront
   - Allows us to manage content updates dynamically based on CMS events

5. **Optimised Data Fetching with App Router:**
   - Leveraging the App Router in Next.js 14 for better routing and data fetching strategies
   - Utilising **React Server Components** for improved data handling and rendering without relying on traditional data fetching methods

## Benefits

- **On-Demand Revalidation:** The main benefit of this architecture is the ability to perform on-demand revalidation of cached content, ensuring that users receive the most up-to-date information without delays
- **Dynamic Content Handling:** Efficiently manage dynamic content updates with ISR and request-level caching
- **Easier Content Management:** Immediate updates from the CMS streamline our workflow, without the need for manual cache purges
- **Consistent Architecture:** Both public and non-public dashboards will use the same proven architecture
- **Security First:** Ensures authenticated endpoints are never cached, maintaining data security and freshness

## Performance Optimization Roadmap

1. **Short Term:**

   - Implement ISR for static content
   - Optimize data fetching patterns
   - Improve component boundaries for better streaming

2. **Medium Term:**

   - Evaluate and implement PPR once stable
   - Add Redis caching for shared data
   - Optimize bundle sizes and loading strategies

3. **Long Term:**
   - Monitor and optimize based on real-world performance metrics
   - Consider edge caching strategies
   - Implement progressive enhancement where appropriate

## Further Investigation

For more details on this transition, please refer to the investigation in the [Pull Request #525](https://github.com/UKHSA-Internal/data-dashboard-frontend/pull/525).

This updated architecture will ensure better performance, scalability, and ease of maintenance while fully leveraging Next.js capabilities, as demonstrated by the non-public dashboard's current implementation.
