# Outstanding Tech Debt

## Contents

1. Client / Server component duplication (introduced during COVER)

## Client / Server component duplication (introduced during COVER)

### Introduction

Most of the components across the dashboard prior to COVER were server components. The use of client side components had been avoided where possible
due to a requirement for the dashboard to work without JavaScript enabled. From here the dashboard follows a progressive enhancement strategy.

The introduction of `Childhood vacinnation coverage statistics` brought with it a change that required several existing components to be used client side.
These components were re-created based on their server component equivalents as client components, which has lead to a number of duplicated components including:

1. Table component
2. Download component
3. ChartRowCard (duplication in TimeseriesFilterCard and SubplotFilterCard)

### Client boundaries

When a component uses the client directive `'use client'` it marks the current component as a client component, however it also creates a client boundary
that means any child components are also treated as client components without the need for a directive. This means we can reuse UI components as both server and client
components removing the need for duplication.

To do this we can create presentational components that contain the UI for a table and use a server or client component as its parent / wrapper that handles any
API requests or state management. This would reduce duplication of UI components and reduce the maintenance burden of keeping multiple components for the same UI.

Example

```BASH
 |-Table
 |---table-container.server.tsx # makes server requests and consumers table.tsx SSR no JS required
 |---table-container.client.tsx # makes API with useEffevt or custom hook. Consumes table.tsx client side hydration
 |---table.tsx
```

### Custom hooks

A number of components make calls to the same endpoints for data across client components. By abstracting these out into custom hooks E.g: `useGetCharts`
we can reduce duplication of these calls in useEffects making them easier to maintain.

```BASH
src/app/components/cms/ClientTable.tsx # uses getCharts
src/app/components/ui/ukhsa/FilterLinkedCards/components/TimeseriesClienchart.tsx # uses getCharts
```

TICKETS:

1. https://ukhsa.atlassian.net/browse/CDD-2912
2. https://ukhsa.atlassian.net/browse/CDD-2911
