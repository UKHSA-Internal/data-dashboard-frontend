export const featureFlags = {
  version: 2,
  features: [
    {
      name: 'nextjs-example',
      type: 'kill-switch',
      enabled: false,
      project: 'default',
      stale: false,
      strategies: [],
      variants: [],
      description: 'Testing nextjs integration',
      impressionData: false,
    },
    {
      name: 'extreme-events',
      type: 'release',
      enabled: true,
      project: 'default',
      stale: false,
      strategies: [],
      variants: [],
      description: null,
      impressionData: false,
    },
  ],
  query: {
    inlineSegmentConstraints: true,
  },
  meta: {
    revisionId: 38,
    etag: '"ae443048:38"',
    queryHash: 'ae443048',
  },
}
