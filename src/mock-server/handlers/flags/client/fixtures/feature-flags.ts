export const featureFlags = {
  version: 2,
  features: [
    {
      name: 'mock-feature-flag',
      type: 'release',
      enabled: false,
      project: 'default',
      stale: false,
      strategies: [],
      variants: [],
      description: null,
      impressionData: false,
    },
    {
      name: 'example-flag',
      type: 'release',
      enabled: false,
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
