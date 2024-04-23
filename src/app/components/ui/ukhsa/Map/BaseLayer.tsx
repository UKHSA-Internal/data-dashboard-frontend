'use client'

import { ComponentProps } from 'react'
import VectorBasemapLayer from 'react-esri-leaflet/plugins/VectorBasemapLayer'
import { TileLayer } from 'react-leaflet'

type BaseLayerProps =
  | {
      variant: 'Default'
      options: ComponentProps<typeof TileLayer>
    }
  | {
      variant: 'Esri'
      options: ComponentProps<typeof VectorBasemapLayer>
    }

const BaseLayer = ({ variant, options }: BaseLayerProps) => {
  if (variant === 'Esri') {
    return <VectorBasemapLayer {...options} name={options.name} apiKey={options.apiKey} />
  }

  return (
    <TileLayer
      {...options}
      attribution={
        options.attribution ?? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
      url={options.url ?? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
    />
  )
}

export default BaseLayer
