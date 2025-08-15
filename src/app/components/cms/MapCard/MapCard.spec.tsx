import React from 'react'

import { render, screen } from '@/config/test-utils'

import MapCard from './MapCard'

// Mock the useMapRef hook
jest.mock('../../ui/ukhsa/Map/shared/hooks/useMapRef', () => ({
  useMapRef: jest.fn(),
}))

jest.mock('../../ui/ukhsa/Map/shared/hooks/useMapData', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    data: {},
    error: null,
  }),
}))

interface MockLayerProps {
  position: string
}

interface MockMapContainerProps {
  children?: React.ReactNode
  className?: string
  id?: string
  scrollWheelZoom?: boolean
  minZoom?: number
  maxZoom?: number
  zoom?: number
  center?: [number, number]
  zoomControl?: boolean
  [key: string]: unknown
}

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({
    children,
    className,
    id,
    scrollWheelZoom,
    minZoom,
    maxZoom,
    zoom,
    center,
    zoomControl,
    ...props
  }: MockMapContainerProps) => (
    <div
      data-testid="map-container"
      className={className}
      id={id}
      data-scroll-wheel-zoom={scrollWheelZoom}
      data-min-zoom={minZoom}
      data-max-zoom={maxZoom}
      data-zoom={zoom}
      data-center={Array.isArray(center) ? center.join(',') : center}
      data-zoom-control={zoomControl}
      {...props}
    >
      {children}
    </div>
  ),
}))

// Mock child components
jest.mock('../../ui/ukhsa/Map/shared/layers/UKHSALogoLayer', () => ({
  UKHSALogoLayer: ({ position }: MockLayerProps) => <div data-testid="ukhsa-logo-layer" data-position={position} />,
}))

jest.mock('../../ui/ukhsa/Map/shared/controls/AttributionControl', () => ({
  AttributionControl: ({ position }: MockLayerProps) => (
    <div data-testid="attribution-control" data-position={position} />
  ),
}))

jest.mock('../../ui/ukhsa/Map/shared/controls/MapLegendControl', () => ({
  MapLegendControl: ({ position }: MockLayerProps) => <div data-testid="map-legend-control" data-position={position} />,
}))

jest.mock('../../ui/ukhsa/Map/shared/controls/ZoomControl', () => ({
  ZoomControl: ({ position }: MockLayerProps) => <div data-testid="zoom-control" data-position={position} />,
}))

jest.mock('../../ui/ukhsa/Map/shared/controls/FullscreenControl', () => ({
  FullscreenControl: ({ position }: MockLayerProps) => (
    <div data-testid="fullscreen-control" data-position={position} />
  ),
}))

jest.mock('../../ui/ukhsa/Map/shared/controls/CoverControl', () => ({
  CoverControl: ({ position }: MockLayerProps) => <div data-testid="cover-control" data-position={position} />,
}))

jest.mock('../../ui/ukhsa/Map/shared/layers/BaseLayer', () => ({
  __esModule: true,
  default: () => <div data-testid="base-layer" />,
}))

jest.mock('../../ui/ukhsa/Map/shared/layers/CoverLayer', () => ({
  __esModule: true,
  default: () => <div data-testid="cover-layer" />,
}))

// Mock constants
jest.mock('@/app/constants/map.constants', () => ({
  center: [52.7957, -1.5479],
  mapId: 'viewport',
  maxZoom: 10,
  minZoom: 6,
  zoom: 7,
}))

// Mock leaflet CSS import
jest.mock('leaflet/dist/leaflet.css', () => ({}))

// Mock clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}))

describe('MapCard', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders all child layers correctly with default props', () => {
    render(<MapCard />)

    expect(screen.getByTestId('map-container')).toBeInTheDocument()
    expect(screen.getByTestId('ukhsa-logo-layer')).toBeInTheDocument()
    expect(screen.getByTestId('attribution-control')).toBeInTheDocument()
    expect(screen.getByTestId('map-legend-control')).toBeInTheDocument()
    expect(screen.getByTestId('zoom-control')).toBeInTheDocument()
    expect(screen.getByTestId('fullscreen-control')).toBeInTheDocument()
    expect(screen.getByTestId('cover-control')).toBeInTheDocument()
  })

  test('applies combined className correctly', () => {
    render(<MapCard />)

    const mapContainer = screen.getByTestId('map-container')
    expect(mapContainer).toHaveClass('relative h-[70vh] overflow-hidden ukhsa-focus')
  })

  test('merges custom className with default classes', () => {
    render(<MapCard className="custom-class" />)

    const mapContainer = screen.getByTestId('map-container')
    expect(mapContainer).toHaveClass('relative h-[70vh] overflow-hidden ukhsa-focus custom-class')
  })

  test('applies correct map ID from constants', () => {
    render(<MapCard />)

    const mapContainer = screen.getByTestId('map-container')
    expect(mapContainer).toHaveAttribute('id', 'viewport')
  })

  test('sets correct control positions with default options', () => {
    render(<MapCard />)

    expect(screen.getByTestId('attribution-control')).toHaveAttribute('data-position', 'bottomright')
    expect(screen.getByTestId('zoom-control')).toHaveAttribute('data-position', 'bottomright')
    expect(screen.getByTestId('fullscreen-control')).toHaveAttribute('data-position', 'bottomright')
  })

  test('applies custom layer positions when provided', () => {
    render(
      <MapCard
        options={{
          attributionControlPosition: 'topleft',
          zoomControlPosition: 'topright',
          fullscreenControlPosition: 'bottomleft',
          scrollWheelZoom: false,
        }}
      />
    )

    expect(screen.getByTestId('attribution-control')).toHaveAttribute('data-position', 'topleft')
    expect(screen.getByTestId('zoom-control')).toHaveAttribute('data-position', 'topright')
    expect(screen.getByTestId('fullscreen-control')).toHaveAttribute('data-position', 'bottomleft')
  })

  test('UKHSA logo layer is positioned correctly', () => {
    render(<MapCard />)

    expect(screen.getByTestId('ukhsa-logo-layer')).toHaveAttribute('data-position', 'topright')
  })

  test('passes through custom MapContainer options', () => {
    render(
      <MapCard
        options={{
          scrollWheelZoom: false,
          attributionControlPosition: 'bottomright',
          fullscreenControlPosition: 'bottomright',
          zoomControlPosition: 'bottomright',
        }}
      />
    )

    const mapContainer = screen.getByTestId('map-container')
    expect(mapContainer).toHaveAttribute('data-scroll-wheel-zoom', 'false')
  })

  test('renders MapContainer with child components', () => {
    render(
      <MapCard>
        <div data-testid="child-1">First Child</div>
        <div data-testid="child-2">Second Child</div>
        <div data-testid="child-3">Third Child</div>
      </MapCard>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })

  test('correctly renders with all specified layers', () => {
    render(<MapCard />)

    const mapContainer = screen.getByTestId('map-container')

    // Check that all required child components are present
    expect(mapContainer).toContainElement(screen.getByTestId('ukhsa-logo-layer'))
    expect(mapContainer).toContainElement(screen.getByTestId('attribution-control'))
    expect(mapContainer).toContainElement(screen.getByTestId('zoom-control'))
    expect(mapContainer).toContainElement(screen.getByTestId('fullscreen-control'))
    expect(mapContainer).toContainElement(screen.getByTestId('cover-control'))
    expect(mapContainer).toContainElement(screen.getByTestId('base-layer'))
  })

  test('applies correct zoom constraints from constants', () => {
    render(<MapCard />)

    const mapContainer = screen.getByTestId('map-container')
    expect(mapContainer).toHaveAttribute('data-min-zoom', '6')
    expect(mapContainer).toHaveAttribute('data-max-zoom', '10')
    expect(mapContainer).toHaveAttribute('data-zoom', '7') // Note: component hardcodes zoom to 6
  })

  test('centers the MapContainer on the provided Coordinates', () => {
    render(<MapCard />)

    const mapContainer = screen.getByTestId('map-container')
    // Center prop would be passed to MapContainer - we can test this was called correctly
    expect(mapContainer).toHaveAttribute('data-center', '52.7957,-1.5479')
  })
})
