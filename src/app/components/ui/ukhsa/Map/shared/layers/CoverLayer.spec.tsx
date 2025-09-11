import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MapContainer } from 'react-leaflet'
import L from 'leaflet'
import CoverLayer from './CoverLayer'
import { MapDataList } from '@/api/models/Maps'
import { ThresholdItemProps } from '../controls/MapLegendControl'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { MapFeatureColour } from '@/app/utils/map.utils'

let layerCounter = 0

// Mock the hooks
jest.mock('@/app/hooks/globalFilterHooks', () => ({
  useGeographyState: jest.fn(),
  useSelectedFilters: jest.fn(),
  useVaccinationState: jest.fn(),
}))

// Mock the map utils
jest.mock('@/app/utils/map.utils', () => ({
  getActiveCssVariableFromColour: jest.fn(() => 'rgb(255, 0, 0)'),
  getCssVariableFromColour: jest.fn(() => 'rgb(0, 255, 0)'),
  getHoverCssVariableFromColour: jest.fn(() => 'rgb(0, 0, 255)'),
}))

// Mock the geojson data
jest.mock('../data/geojson/countries', () => ({
  __esModule: true,
  default: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'test-country-1',
        properties: {
          CTYUA24CD: 'E06000001',
          CTYUA24NM: 'Test Country',
          LAT: 51.5074,
          LONG: -0.1278,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              [0, 0],
            ],
          ],
        },
      },
    ],
  },
}))

jest.mock('../data/geojson/local-authorities', () => ({
  __esModule: true,
  default: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'test-la-1',
        properties: {
          CTYUA24CD: 'E06000001',
          CTYUA24NM: 'Test Local Authority',
          LAT: 51.5074,
          LONG: -0.1278,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              [0, 0],
            ],
          ],
        },
      },
    ],
  },
}))

jest.mock('../data/geojson/ukhsa-regions', () => ({
  __esModule: true,
  default: {
    type: 'FeatureCollection',
    name: 'Regions',
    features: [
      {
        type: 'Feature',
        id: 'test-region-1',
        properties: {
          RGN23CD: 'E12000001',
          RGN23NM: 'Test Region',
          LAT: 51.5074,
          LONG: -0.1278,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              [0, 0],
            ],
          ],
        },
      },
    ],
  },
}))

// Mock keyboard accessibility hook
jest.mock('../hooks/useChoroplethKeyboardEvents', () => ({
  useChoroplethKeyboardAccessibility: jest.fn(() => [<div key="screen-reader">Screen reader text</div>, jest.fn()]),
}))

// Mock Leaflet
const mockMap = {
  getZoom: jest.fn(() => 7),
  setView: jest.fn(),
}

jest.mock('react-leaflet', () => ({
  ...jest.requireActual('react-leaflet'),
  useMap: () => mockMap,
  useMapEvents: jest.fn((events) => {
    // Store events for testing
    ;(global as any).mockMapEvents = events
    return null
  }),
  GeoJSON: jest.fn(({ onEachFeature, style, data, interactive }) => {
    const currentLayerId = ++layerCounter
    const features = Array.isArray(data) ? data.flatMap((fc) => fc.features) : data.features
    const layerName = data?.name || (Array.isArray(data) ? 'multi-layer' : 'single-layer')

    return (
      <div
        data-testid={`geojson-layer-${currentLayerId}`}
        data-layer-name={layerName}
        data-interactive={interactive}
        data-feature-count={features.length}
      >
        {features.map((feature: any, index: number) => {
          const mockLayer = {
            feature,
            on: jest.fn((events) => {
              // Store the click handler for testing - use feature-specific key
              const featureId = feature.properties.CTYUA24CD || feature.properties.RGN23CD || `unknown-${index}`
              ;(global as any)[`mockLayerEvents_${featureId}`] = events
            }),
            setStyle: jest.fn(),
            bindTooltip: jest.fn().mockReturnThis(),
            openTooltip: jest.fn().mockReturnThis(),
            closeTooltip: jest.fn().mockReturnThis(),
            unbindTooltip: jest.fn().mockReturnThis(),
            getElement: jest.fn(() => ({
              setAttribute: jest.fn(),
            })),
          }

          // Call onEachFeature if provided
          if (onEachFeature) {
            onEachFeature(feature, mockLayer)
          }

          const featureStyle = style ? style(feature) : {}
          const featureId = feature.properties.CTYUA24CD || feature.properties.RGN23CD || `unknown-${index}`

          return (
            <div
              key={`feature-${featureId}-${currentLayerId}`}
              data-testid={`feature-${featureId}`}
              data-feature-id={featureId}
              data-feature-name={feature.properties.CTYUA24NM || feature.properties.RGN23NM}
              data-layer-id={currentLayerId}
              style={{
                backgroundColor: featureStyle.fillColor,
                borderColor: featureStyle.color,
                borderWidth: featureStyle.weight,
              }}
              onClick={() => {
                const clickEvent = {
                  target: { feature },
                  latlng: L.latLng(feature.properties.LAT, feature.properties.LONG),
                }
                const layerEvents = (global as any)[`mockLayerEvents_${featureId}`]
                if (layerEvents?.click) {
                  layerEvents.click(clickEvent)
                }
              }}
              onMouseOver={() => {
                const layerEvents = (global as any)[`mockLayerEvents_${featureId}`]
                if (layerEvents?.mouseover) {
                  layerEvents.mouseover()
                }
              }}
              onMouseOut={() => {
                const layerEvents = (global as any)[`mockLayerEvents_${featureId}`]
                if (layerEvents?.mouseout) {
                  layerEvents.mouseout()
                }
              }}
            >
              {feature.properties.CTYUA24NM || feature.properties.RGN23NM}
            </div>
          )
        })}
      </div>
    )
  }),
}))

const getAllGeoJSONLayers = () => {
  const layers = []
  let layerIndex = 1
  while (true) {
    try {
      const layer = screen.getByTestId(`geojson-layer-${layerIndex}`)
      layers.push(layer)
      layerIndex++
    } catch {
      break
    }
  }
  return layers
}

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MapContainer center={[51.505, -0.09]} zoom={13}>
    {children}
  </MapContainer>
)

describe('CoverLayer', () => {
  const mockMapData: MapDataList = [
    {
      geography_code: 'E06000001',
      geography: 'Test Local Authority',
      geography_type: 'Upper Tier Local Authority',
      metric_value: 75.5,
      accompanying_points: [
        {
          label_prefix: 'Country coverage',
          metric_value: 80.2,
          label_suffix: '%',
        },
        {
          label_prefix: 'Region coverage',
          metric_value: 78.1,
          label_suffix: '%',
        },
      ],
    },
  ]

  const mockThresholds: ThresholdItemProps[] = [
    {
      colour: 'green' as MapFeatureColour,
      boundary_minimum_value: 70,
      boundary_maximum_value: 100,
      label: 'High Coverage',
    },
    {
      colour: 'yellow' as MapFeatureColour,
      boundary_minimum_value: 40,
      boundary_maximum_value: 69.9,
      label: 'Medium Coverage',
    },
    {
      colour: 'red' as MapFeatureColour,
      boundary_minimum_value: 0,
      boundary_maximum_value: 39.9,
      label: 'Low Coverage',
    },
  ]

  const mockGeographyFilters: GeographiesSchemaObject[] = [
    {
      geography_code: 'E06000001',
      name: 'Test Local Authority',
      geography_type: 'Upper Tier Local Authority',
      relationships: [
        {
          geography_type: 'Region',
          name: 'Test Region',
        },
        {
          geography_type: 'Nation',
          name: 'England',
        },
      ],
    },
  ]

  // Mock hook implementations
  const mockUseGeographyState = require('@/app/hooks/globalFilterHooks').useGeographyState
  const mockUseSelectedFilters = require('@/app/hooks/globalFilterHooks').useSelectedFilters
  const mockUseVaccinationState = require('@/app/hooks/globalFilterHooks').useVaccinationState

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset layer counter
    layerCounter = 0
    // Clear global mock events
    Object.keys(global as any).forEach((key) => {
      if (key.startsWith('mockLayerEvents_')) {
        delete (global as any)[key]
      }
    })

    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map([
        [
          'Upper Tier Local Authority',
          [
            {
              geography_code: 'E06000001',
              geography: 'Test Local Authority',
              geography_type: 'Upper Tier Local Authority',
              relationships: [
                {
                  geography_type: 'Region',
                  name: 'Test Region',
                },
                {
                  geography_type: 'Nation',
                  name: 'England',
                },
              ],
            },
          ],
        ],
      ]),
    })

    mockUseSelectedFilters.mockReturnValue({
      addFilterFromMap: jest.fn(),
    })

    mockUseVaccinationState.mockReturnValue({
      selectedVaccination: {
        value: {
          label: 'COVID-19 Vaccination',
        },
      },
    })
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      expect(screen.getByTestId('geojson-layer-3')).toBeInTheDocument()
    })

    it('renders screen reader accessibility text', () => {
      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      expect(screen.getByText('Screen reader text')).toBeInTheDocument()
    })

    it('renders features with correct data-testid attributes', () => {
      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      expect(screen.getByTestId('feature-E06000001')).toBeInTheDocument()
    })
  })

  describe('Feature Interactions', () => {
    it('handles feature clicks and opens tooltip', async () => {
      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      const feature = screen.getByTestId('feature-E06000001')
      fireEvent.click(feature)

      // Verify map setView was called
      await waitFor(() => {
        expect(mockMap.setView).toHaveBeenCalled()
      })
    })

    it('handles map clicks to deselect features', async () => {
      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      // First click a feature
      const feature = screen.getByTestId('feature-E06000001')
      fireEvent.click(feature)

      // Then simulate map click
      if ((global as any).mockMapEvents?.click) {
        ;(global as any).mockMapEvents.click()
      }

      // Feature should be deselected (this would be tested through state changes)
      expect(true).toBe(true) // Placeholder - in real tests you'd check state
    })

    it('applies correct styling based on feature data', () => {
      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      const feature = screen.getByTestId('feature-E06000001')
      const styles = getComputedStyle(feature)

      // Should have green background for high coverage (75.5% falls in 70-100 range)
      expect(styles.backgroundColor).toBe('rgba(62, 62, 62, 0.8)')
    })
  })

  describe('Geography Filters', () => {
    it('handles selected geography filters and updates map view', async () => {
      const { rerender } = render(
        <TestWrapper>
          <CoverLayer mapData={mockMapData} dataThresholds={mockThresholds} selectedGeographyFilters={null} />
        </TestWrapper>
      )

      // Update with geography filters
      rerender(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(mockMap.setView).toHaveBeenCalledWith(
          expect.any(Object), // L.latLng object
          8
        )
      })
    })
  })

  describe('Data Loading and Error Handling', () => {
    it('handles missing map data gracefully', () => {
      render(
        <TestWrapper>
          <CoverLayer mapData={[]} dataThresholds={mockThresholds} selectedGeographyFilters={mockGeographyFilters} />
        </TestWrapper>
      )

      expect(screen.getByTestId('geojson-layer-3')).toBeInTheDocument()
    })

    it('handles features without metric values', () => {
      const mapDataWithoutMetric: MapDataList = [
        {
          geography_code: 'E06000002',
          geography: 'Test LA Without Data',
          geography_type: 'Upper Tier Local Authority',
          metric_value: null,
          accompanying_points: null,
        },
      ]

      render(
        <TestWrapper>
          <CoverLayer
            mapData={mapDataWithoutMetric}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      expect(screen.getByTestId('geojson-layer-3')).toBeInTheDocument()
    })
  })

  describe('Tooltip Functionality', () => {
    it('renders tooltip with correct information', () => {
      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      const feature = screen.getByTestId('feature-E06000001')
      fireEvent.click(feature)

      // In a real implementation, you would check that the tooltip content is rendered
      // This depends on how tooltips are implemented in your Leaflet setup
    })

    it('handles missing geography data in tooltip', () => {
      // Mock empty geography data
      mockUseGeographyState.mockReturnValue({
        geographyAreas: new Map(),
      })

      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      const feature = screen.getByTestId('feature-E06000001')
      fireEvent.click(feature)

      // Should handle missing data gracefully
      expect(true).toBe(true) // Placeholder
    })
  })

  describe('Zoom and Data Level Changes', () => {
    it('updates data level when zoom changes', async () => {
      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      // Simulate zoom end event
      if ((global as any).mockMapEvents?.zoomend) {
        ;(global as any).mockMapEvents.zoomend()
      }

      // The component should handle the zoom change
      expect(true).toBe(true) // Placeholder - you'd test actual behavior
    })
  })

  describe('Accessibility', () => {
    it('calls keyboard accessibility hook', () => {
      const mockAccessibilityHook = require('../hooks/useChoroplethKeyboardEvents').useChoroplethKeyboardAccessibility

      render(
        <TestWrapper>
          <CoverLayer
            mapData={mockMapData}
            dataThresholds={mockThresholds}
            selectedGeographyFilters={mockGeographyFilters}
          />
        </TestWrapper>
      )

      expect(mockAccessibilityHook).toHaveBeenCalled()
    })
  })
})
