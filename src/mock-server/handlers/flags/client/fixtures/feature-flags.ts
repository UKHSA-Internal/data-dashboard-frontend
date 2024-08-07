export const featureFlags = {
  version: 2,
  features: [
    {
      name: 'adverse-weather',
      type: 'release',
      enabled: true,
      project: 'default',
      stale: false,
      strategies: [],
      variants: [],
      description: null,
      impressionData: false,
    },
    {
      name: 'new-landing-page',
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
