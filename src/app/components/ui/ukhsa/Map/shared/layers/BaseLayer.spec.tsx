import { render, screen } from '@/config/test-utils'

import BaseLayer from './BaseLayer'

interface MockTileLayerProps {
  url: string
  attribution: string
}

jest.mock('react-leaflet', () => ({
  TileLayer: ({ url, attribution }: MockTileLayerProps) => (
    <div data-testid="tile-layer" data-url={url} data-attribution={attribution} />
  ),
  Rectangle: () => <div data-testid="france-mask" />,
}))

describe('BaseLayer', () => {
  test('renders OS Maps Light tiles through the app proxy', () => {
    render(<BaseLayer />)

    const tileLayer = screen.getByTestId('tile-layer')

    expect(tileLayer).toHaveAttribute('data-url', '/api/proxy/os-maps/{z}/{x}/{y}')
    expect(tileLayer).toHaveAttribute('data-attribution', expect.stringContaining('Contains OS data'))
    expect(screen.getAllByTestId('france-mask')).toHaveLength(2)
  })
})
