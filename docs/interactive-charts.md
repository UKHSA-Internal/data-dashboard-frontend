# Interactive Charts Documentation

## Overview

This documentation outlines the new interactive chart functionality integrated into our application. This feature is designed to enhance user experience while maintaining the integrity of our existing static charts.

## Key Features

1. **Tooltip Integration:**

   - The initial phase introduces a tooltip for interactive charts, providing users with detailed information on hover.

2. **Feature Flag Activation:**

   - The interactive chart functionality is controlled through a feature flag, allowing for easy toggling during development and deployment.

3. **Interactive Control:**

   - The `enableInteractive` prop has been added to specify which areas of the chart should utilize Plotly.js for interactivity, ensuring precise control over interactive features.

4. **Lazy Rendering with Intersection Observer API:**

   - We employ the Intersection Observer API to render interactive charts only when they are scrolled into view. This enhances performance by deferring rendering until necessary.
   - If the chart is not in view, it will default to existing static charts, ensuring a smooth user experience without unnecessary resource consumption.

5. **Progressive Enhancement:**

   - The implementation is fully progressively enhanced. On the first load, the static charts are displayed to ensure that users can access the information without delay.
   - Interactive features are activated once the chart comes into view, providing an enhanced experience without compromising initial load performance.

## Future Expansion

As we move forward with the development of interactive charts, it is essential to note that the backend serves as the source of truth for both data and layout configurations. Any additional interactivity must be sourced from the backend to ensure consistency and accuracy across all chart implementations.

However, front-end developers have the opportunity to experiment with interactive features by modifying `ChartInteractive.tsx`. By adjusting the contents of the figure object within this file, developers can prototype and test new interactions locally before finalising any backend changes. This approach encourages innovation while maintaining a structured and reliable data flow.
