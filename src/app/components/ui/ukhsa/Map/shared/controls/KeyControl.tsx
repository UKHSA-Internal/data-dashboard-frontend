'use client'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { KeyboardEvent, useState } from 'react'
import Control from 'react-leaflet-custom-control'

import { HealthAlertStatus } from '@/api/models/Alerts'
import { useTranslation } from '@/app/i18n/client'
import { getTailwindBackgroundFromColour, getTextColourCssFromColour } from '@/app/utils/map.utils'

interface KeyControlProps {
  position: ControlPosition
  keyItems: HealthAlertStatus[]
}

export function KeyControl({ position, keyItems }: KeyControlProps) {
  const { t } = useTranslation('weatherHealthAlerts')
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

  const renderKey = (keyItems: HealthAlertStatus[]) => {
    return (
      <div className="m-2 bg-white p-2" data-testid="map-key">
        <div className="flex items-center justify-between">
          <p className="govuk-heading-m m-0 mb-1">Key</p>
          {renderCloseButton()}
        </div>
        <div className="m-0 mb-1 grid grid-cols-none gap-2">
          {keyItems.map((colour, index) => {
            return (
              <div key={index} className={clsx(`px-6`, getTailwindBackgroundFromColour(colour))}>
                <p className={'text-center govuk-body ' + getTextColourCssFromColour(colour) + ' m-0 capitalize'}>
                  {colour == 'Green' ? t('map.no-alert') : t('map.alert', { level: colour.toLowerCase() })}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return <Control position={position}>{showKey ? renderKey(keyItems) : renderKeyButton()}</Control>
}
