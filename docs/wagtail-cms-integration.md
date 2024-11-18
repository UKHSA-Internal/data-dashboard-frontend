# Wagtail CMS Integration with Next.js Application

This document details the architecture and workflow of the Next.js application’s integration with Wagtail CMS, with an emphasis on the dynamic rendering and content handling approach.

## Overview

The front-end (FE) application is built with **Next.js 14** using the **app router**, deployed to AWS via Docker, and integrated with CloudFront CDN. All routes are configured with **forceDynamic** to disable origin-level caching, and CDN caching is generally set with a **30-minute TTL**, except for specific pages like the landing page and weather health alerts.

## Wagtail CMS and Data Fetching

Our CMS, Wagtail, is a traditional Python-based CMS with headless capabilities, allowing REST API integration. The FE application consumes data from Wagtail’s private API, which offers both Wagtail-specific endpoints (`/api/pages/:id`) and additional, non-Wagtail endpoints. These endpoints may require page-specific payloads, which Wagtail provides in its responses. For example, a request to `/api/pages/:id` returns structured data for that page’s type (e.g., `TopicPage`), including any necessary data to render complex elements like charts or trend cards.

## Dynamic Page Rendering in Next.js

The FE application uses a **dynamic page renderer** pattern. This pattern enables the front-end to interpret URL paths dynamically and map them to Wagtail content:

1. **Dynamic Routing**: A dynamic Next.js route is defined at `src/app/(cms)/[[...slug]]/page.tsx`. This route parses the incoming URL path, retrieves all available CMS pages, and matches the path to a specific page type in Wagtail (such as `LandingPage`, `CompositePage`, or `TopicPage`).

2. **Page-Type Specific RSCs**: Once the page type is identified, the application renders the corresponding **React Server Component (RSC)** for that type. Each RSC is responsible for handling further data fetching and rendering content unique to the page type, often by forwarding data to additional bespoke endpoints like `/api/charts`.

### Block-Based Component Mapping

After determining the correct page type, the dynamic page renderer processes the page content into reusable "blocks." This approach allows granular, block-specific rendering within each page:

- **Block Mapping Logic**: The body of each page type is made up of various **blocks** (e.g., `text_card`, `headline_numbers_row_card`, `chart_row_card`). The page body content is mapped to these block identifiers in `src/app/utils/cms.utils.tsx`.

- **Component Rendering**: Each block identifier maps to a specific RSC in the front-end. For example, a `text_card` block will render the `TextCardComponent`, with any additional data from Wagtail passed through. This mapping allows the application to modularly handle a range of content types, such as:
  - `text_card` for general text content
  - `headline_numbers_row_card` for highlighted headline and trend metrics
  - `chart_row_card` for dynamic data served in static & interactive plotly.js charts
  - `weather_health_alert_card` for heat and cold weather health alert mini-map

## Summary

This architecture enables the Next.js application to serve as a dynamic, headless front-end to Wagtail CMS, using URL path-based routing to match and render diverse page types. By organising page content into reusable blocks, the FE gains the flexibility to dynamically render complex layouts while reusing consistent component logic across different page types.
