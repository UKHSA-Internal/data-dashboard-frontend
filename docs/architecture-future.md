# Future Plans for Next.js Architecture

We are planning to enhance our Next.js architecture by removing CloudFront and re-enabling request-level caching. This change will optimise performance while allowing us to leverage Next.js features more effectively.

## Key Changes

1. **Removal of CloudFront:**

   - Simplifies our architecture and reduces complexity.
   - Eliminates CDN latency, allowing direct requests to Next.js.

2. **Re-enabling Request-Level Caching:**

   - Utilises Next.js's built-in caching mechanisms to improve response times for dynamic routes.
   - **Redis Integration:** Employing Redis for shared caching across multiple containers in the load balancer to ensure consistent performance and reduced latency.

3. **Incremental Static Regeneration (ISR):**

   - ISR will be reactivated, allowing us to update static content without a full rebuild.
   - Allows for caching of dynamic pages, enabling efficient content delivery.

4. **CMS Integration for On-Demand Purges:**

   - Hooking up the caching strategy to our CMS for instant purging of outdated content, now managed directly without CloudFront.
   - Allows us to manage content updates dynamically based on CMS events.

5. **Optimised Data Fetching with App Router:**
   - Leveraging the App Router in Next.js 14 for better routing and data fetching strategies.
   - Utilising **React Server Components** for improved data handling and rendering without relying on traditional data fetching methods.

## Benefits

- **On-Demand Revalidation:** The main benefit of this architecture is the ability to perform on-demand revalidation of cached content, ensuring that users receive the most up-to-date information without delays.
- **Dynamic Content Handling:** Efficiently manage dynamic content updates with ISR and request-level caching.
- **Easier Content Management:** Immediate updates from the CMS streamline our workflow, without the need for manual cache purges.

## Further Investigation

For more details on this transition, please refer to the investigation in the [Pull Request #525](https://github.com/UKHSA-Internal/data-dashboard-frontend/pull/525).

This updated architecture will ensure better performance, scalability, and ease of maintenance while fully leveraging Next.js capabilities.
