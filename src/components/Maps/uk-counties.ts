export const counties: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Test area' },
      geometry: {
        type: 'GeometryCollection',
        geometries: [
          {
            type: 'Polygon',
            coordinates: [
              [
                [-2.0, 53],
                [-1.9, 53.2],
                [-1.7, 53.3],
                [-1.4, 53.2],
                [-1.2, 53],
                [-1.0, 52.8],
                [-0.8, 52.5],
                [-1.0, 52.1],
                [-1.2, 52.2],
                [-1.5, 52.4],
                [-1.6, 52.5],
                [-1.8, 52.8],
              ],
            ],
          },
        ],
      },
    },
  ],
}
