# Accessibility and Progressive Enhancement on the UKHSA Data Dashboard

In alignment with the **GDS (Government Digital Service) guidelines**, our approach to building the UKHSA Data Dashboard emphasises **progressive enhancement**. This ensures that core functionality is accessible and performant across all users and devices, regardless of JavaScript support. By designing features to function with minimal JavaScript, we improve both **accessibility** and **performance**, as most of the application is either statically or server-rendered. Below are key examples illustrating how progressive enhancement is applied across different features on the dashboard.

## Key Examples of Progressive Enhancement

1. **Navigation Dropdown Menu**  
   The primary navigation dropdown menu relies on JavaScript for opening and closing. However, to support users without JavaScript, the "Menu" text is also a hyperlink that redirects to a dedicated `/browse` page. This page provides a fully accessible fallback navigation menu, ensuring all users can navigate the site effectively.

2. **Interactive Charts**  
   We use **Plotly.js** to enhance charts with interactivity. Initially, all charts are rendered as static images upon page load, making them accessible and performant. Once the page's JavaScript is downloaded, the charts are progressively “hydrated” with Plotly.js to enable dynamic interactions, providing enhanced functionality without sacrificing accessibility.

3. **File Downloads**  
   All file downloads are implemented using plain `<form>` elements with `action` attributes pointing to the Next.js proxy API. This structure allows file downloads to function without JavaScript, offering seamless access for users with or without JS enabled.

4. **Topic Page Area Selector**  
   The area selector on Topic pages is implemented as a standard `<form>`. The form submission simply appends query parameters to the URL, which the server then interprets to serve location-based content. This approach enables functionality for users without JavaScript and ensures graceful handling of location-based page requests.

5. **Weather Health Alerts Map**  
   The weather health alerts map is an inherently JavaScript-heavy feature, using dynamic content to display interactive map elements. For users unable to access JavaScript content, an alternative, fully server-rendered view of the map data is provided on the weather health alert pages. This ensures critical information is accessible to all users, regardless of device or browser capabilities.

## Summary

Following GDS guidelines on progressive enhancement allows the UKHSA Data Dashboard to prioritise accessibility and performance. By ensuring each feature has a fallback or a server-rendered version, we provide a robust, inclusive experience for users across a range of capabilities and devices, making the data dashboard both accessible and highly performant.
