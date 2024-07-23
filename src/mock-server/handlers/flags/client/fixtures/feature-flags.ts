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
      name: 'map-tile-provider',
      type: 'release',
      enabled: true,
      project: 'default',
      stale: false,
      strategies: [],
      variants: [
        {
          name: 'OpenStreetMaps',
          enabled: true,
          payload: { type: 'string', value: 'OpenStreetMaps' },
          feature_enabled: true,
        },
        {
          name: 'OrdinanceSurveyMaps',
          enabled: false,
          payload: { type: 'string', value: 'OrdinanceSurveyMaps' },
          feature_enabled: false,
        },
        {
          name: 'ArcGISEsri',
          enabled: false,
          payload: { type: 'string', value: 'ArcGISEsri' },
          feature_enabled: false,
        },
      ],
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
