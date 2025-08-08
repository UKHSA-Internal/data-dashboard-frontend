'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import dynamic from 'next/dynamic'
import { ComponentProps, ReactNode, useMemo } from 'react'
import { MapContainer } from 'react-leaflet'

import { center, mapId, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'
import { MapFeatureColour } from '@/app/utils/map.utils'

import { AttributionControl } from '../../ui/ukhsa/Map/shared/controls/AttributionControl'
import { FullscreenControl } from '../../ui/ukhsa/Map/shared/controls/FullscreenControl'
import { MapLegendControl, ThresholdItemProps } from '../../ui/ukhsa/Map/shared/controls/MapLegendControl'
import { YearSelectControl } from '../../ui/ukhsa/Map/shared/controls/YearSelectControl'
import { ZoomControl } from '../../ui/ukhsa/Map/shared/controls/ZoomControl'
import useMapData from '../../ui/ukhsa/Map/shared/hooks/useMapData'
import { useMapRef } from '../../ui/ukhsa/Map/shared/hooks/useMapRef'
import { UKHSALogoLayer } from '../../ui/ukhsa/Map/shared/layers/UKHSALogoLayer'

const { BaseLayer, CoverLayer } = {
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayer'), {
    ssr: false,
  }),
  CoverLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/CoverLayer'), {
    ssr: false,
  }),
}

interface DefaultOptions extends ComponentProps<typeof MapContainer> {
  zoomControlPosition: ControlPosition
  attributionControlPosition: ControlPosition
  fullscreenControlPosition: ControlPosition
}

const mapDefaults: DefaultOptions = {
  zoom,
  center,
  scrollWheelZoom: true,
  attributionControlPosition: 'bottomright',
  zoomControlPosition: 'bottomright',
  fullscreenControlPosition: 'bottomright',
}

interface MapCardProps {
  children?: ReactNode
  options?: DefaultOptions
  className?: string
}

export default function MapCard({
  children,
  className,
  options: { attributionControlPosition, zoomControlPosition, fullscreenControlPosition, ...options } = mapDefaults,
}: MapCardProps) {
  const ref = useMapRef()

  const thresholdData: ThresholdItemProps[] = [
    {
      colour: 'MAP_COLOUR_1_LIGHT_YELLOW' as MapFeatureColour,
      label: 'less than 65%',
      boundary_minimum_value: 0.0,
      boundary_maximum_value: 0.64,
    },
    {
      colour: 'MAP_COLOUR_2_LIGHT_GREEN' as MapFeatureColour,
      label: '65% - 74%',
      boundary_minimum_value: 0.65,
      boundary_maximum_value: 0.74,
    },
    {
      colour: 'MAP_COLOUR_3_TURQUOISE' as MapFeatureColour,
      label: '75% - 84%',
      boundary_minimum_value: 0.75,
      boundary_maximum_value: 0.84,
    },
    {
      colour: 'MAP_COLOUR_4_BLUE' as MapFeatureColour,
      label: '85% - 95%',
      boundary_minimum_value: 0.85,
      boundary_maximum_value: 0.95,
    },
    {
      colour: 'MAP_COLOUR_5_DARK_BLUE' as MapFeatureColour,
      label: 'over 95%',
      boundary_minimum_value: 0.96,
      boundary_maximum_value: 1,
    },
  ]

  const request = {
    date_from: '2023-10-30',
    date_to: '2023-10-31',
    parameters: {
      theme: 'infectious_disease',
      sub_theme: 'respiratory',
      topic: 'COVID-19',
      metric: 'COVID-19_deaths_ONSByWeek',
      stratum: 'default',
      age: 'all',
      sex: 'all',
      geography_type: 'Lower Tier Local Authority',
      geographies: [],
    },
    accompanying_points: [
      {
        label_prefix: 'Rate of cases in England: ',
        label_suffix: '',
        parameters: {
          metric: 'COVID-19_cases_rateRollingMean',
          geography_type: 'Nation',
          geography: 'England',
        },
      },
    ],
  }

  const mapData = useMapData(request)

  const coverLayer = useMemo(() => {
    if (!mapData.data) return
    return <CoverLayer dataThresholds={thresholdData} mapData={mapData.data.data} />
  }, [thresholdData, mapData.data])

  return (
    <>
      <MapContainer
        {...options}
        id={mapId}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoom={7}
        ref={ref}
        className={clsx('relative h-[70vh] overflow-hidden ukhsa-focus', className)}
        zoomControl={false}
      >
        <UKHSALogoLayer position="topright" />
        <YearSelectControl position="topleft" className="p-2`" />
        <AttributionControl position={attributionControlPosition} />
        <ZoomControl position={zoomControlPosition} />
        <FullscreenControl position={fullscreenControlPosition} />
        <BaseLayer />
        {coverLayer}
        {children}
      </MapContainer>
      <MapLegendControl thresholdData={thresholdData} />
    </>
  )
}
