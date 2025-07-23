'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { KeyboardEvent, useState } from 'react'
import Control from 'react-leaflet-custom-control'

import { useTranslation } from '@/app/i18n/client'
import { getCssVariableFromColour, getTailwindBackgroundFromColour, MapFeatureColour } from '@/app/utils/map.utils'

export interface ThresholdItemProps {
  colour: MapFeatureColour
  label: string
  boundary_minimum_value: number
  boundary_maximum_value: number
}

interface LegendControlProps {
  position?: ControlPosition
  thresholdData: ThresholdItemProps[]
}

export function MapLegendControl({ position, thresholdData }: LegendControlProps) {
  const { t } = useTranslation('map')
  const [showKey, setShowKey] = useState(true)

  function clickHandler() {
    return {
      onClick: () => setShowKey(!showKey),
      onKeyDown: (event: KeyboardEvent) => {
        console.log(event.key)
      },
    }
  }

  const renderKeyButton = () => (
    <button className="govuk-button govuk-button--secondary ukhsa-map__button m-2 p-2" {...clickHandler()}>
      <span>Display Key</span>
    </button>
  )

  const renderCloseButton = () => (
    <button
      className="govuk-button govuk-button--secondary mb-3 flex w-auto gap-1 disabled:pointer-events-none "
      {...clickHandler()}
      data-testid="close-key-button"
    >
      <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20">
        <path d="M10,8.6L15.6,3L17,4.4L11.4,10L17,15.6L15.6,17L10,11.4L4.4,17L3,15.6L8.6,10L3,4.4L4.4,3L10,8.6Z"></path>
      </svg>
    </button>
  )

  const renderKey = (legendItems: ThresholdItemProps[]) => {
    return (
      <div className="m-2 bg-white p-2" data-testid="map-key">
        <div className="flex items-center justify-between">
          <p className="govuk-heading-m m-0 mb-1">Key</p>
          {renderCloseButton()}
        </div>
        <div className="m-0 mb-1 grid grid-cols-none gap-2">
          {legendItems.map((legendItem, index) => {
            return (
              <div key={`${legendItem.label}-` + index} className="flex">
                <div className={clsx('size-14 flex-none bg-black px-2', getCssVariableFromColour(legendItem.colour))}>
                  &nbsp;
                </div>
                <div key={index} className={clsx(`flex-auto px-5`, 'bg-white')}>
                  <p className={'govuk-body m-0 text-center capitalize text-black'}>{legendItem.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderParallelKey = (legendItems: ThresholdItemProps[]) => {
    const reversedLegendItems = [...legendItems].reverse()
    return (
      <div
        className="border-gray-300 fixed bottom-4 left-1/2 z-[1000]
          m-2 max-w-sm -translate-x-1/2
          rounded border bg-white p-3 shadow-lg
          md:relative md:bottom-auto md:left-auto md:transform-none"
        data-testid="map-key"
      >
        <div className="flex items-center justify-between">
          <p className="govuk-heading-m m-0 mb-1">Key</p>
          {renderCloseButton()}
        </div>
        <div className="m-0 mb-1 flex">
          {reversedLegendItems.map((legendItem, index) => {
            return (
              <div key={`${legendItem.label}-` + index} className="flex-auto">
                <div className={clsx('size-14 flex-none bg-black px-2', getCssVariableFromColour(legendItem.colour))}>
                  &nbsp;
                </div>
                <div key={index} className={clsx(`flex-none px-2`, 'bg-white')}>
                  <p className={'govuk-body m-0 text-center capitalize text-black'}>{legendItem.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderLegend = (thresholdData: ThresholdItemProps[]) => {
    return (
      <div
        className="
        z-[1000]
        flex min-w-[280px] max-w-full
        flex-col rounded
        bg-white px-4
        py-3
        shadow-lg sm:min-w-[400px]
        md:min-w-[600px]
      "
      >
        {/* Header for the legend component*/}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg m-0 font-semibold">Key</h3>
        </div>

        {/* Horizontal legend bar */}
        <div className="flex w-full overflow-hidden">
          {thresholdData.map((legendItem: ThresholdItemProps, index: number) => (
            <div key={`${legendItem.label}-${index}`} className="flex flex-1 flex-col">
              {/* Color segment */}
              <div className={clsx('h-4 w-full', getTailwindBackgroundFromColour(legendItem.colour))} />
              {/* Text label below */}
              <div className="border-gray-300 border-r bg-white p-2 text-center last:border-r-0">
                <p className="text-sm m-0 text-black">{legendItem.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (position) {
    return <Control position={position}>{showKey ? renderParallelKey(thresholdData) : renderKeyButton()}</Control>
  } else {
    return renderLegend(thresholdData)
  }
}
