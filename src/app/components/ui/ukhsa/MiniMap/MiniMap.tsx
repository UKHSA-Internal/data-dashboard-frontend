/* eslint-disable jsx-a11y/no-noninteractive-element-interactions -- for minimap interactivity */
'use client'

import { useRouter } from 'next/navigation'
import React, { memo, useCallback, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'
import RightArrowCircleIcon from '@/app/components/ui/ukhsa/Icons/RightArrowCircle'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { getCssVariableFromColour } from '@/app/utils/weather-health-alert.utils'
import { clsx } from '@/lib/clsx'

import { regionPaths } from './constants'

interface AlertListItemProps {
  name: string
  status: HealthAlertStatus
  isHovered: boolean
  isAnyHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void
}

const AlertListItem = memo(
  ({ name, status, isHovered, isAnyHovered, onMouseEnter, onMouseLeave, onClick }: AlertListItemProps) => (
    <li
      aria-label={`${name}: ${status} alert`}
      className={clsx('relative min-w-[16rem] transition-all duration-150', {
        'font-bold': isHovered,
        'opacity-30': isAnyHovered && !isHovered,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <span
        className={clsx(`absolute left-0 top-[3px] mr-2 inline-block size-3 rounded-full`)}
        style={{ background: getCssVariableFromColour(status) }}
      />
      <span className="ml-5 block">{name}</span>
    </li>
  )
)

interface MapRegionProps {
  id: string
  status: HealthAlertStatus
  isHovered: boolean
  isAnyHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: (event: React.MouseEvent | React.KeyboardEvent) => void
}

const MapRegion = memo(
  ({ id, isHovered, isAnyHovered, status, onMouseEnter, onMouseLeave, onClick }: MapRegionProps) => {
    const fillColor = isAnyHovered && !isHovered ? 'var(--colour-offwhite)' : getCssVariableFromColour(status)

    return (
      <>
        <mask id={`mask-${id}`} fill="#000" maskUnits="userSpaceOnUse">
          <path fill="#fff" d={regionPaths[id]} />
        </mask>
        <path
          style={{
            fill: fillColor,
          }}
          className={clsx('pointer-events-auto transition-all duration-150')}
          data-testid={`feature-${id}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          onKeyDown={onClick}
          d={regionPaths[id]}
        />
        <path stroke="#F7F7F7" d={regionPaths[id]} mask={`url(#mask-${id})`} />
      </>
    )
  }
)

interface MiniMapProps {
  alertType: HealthAlertTypes
}

export function MiniMap({ alertType }: MiniMapProps): React.ReactElement | null {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const alerts = useWeatherHealthAlertList({ type: alertType })
  const router = useRouter()

  const [debouncedHoveredRegion] = useDebounceValue(hoveredRegion, 80)

  const handleMouseEnter = useCallback((region: string) => {
    setHoveredRegion(region)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredRegion(null)
  }, [])

  const handleClick = useCallback(
    (regionId: string) => {
      const url = new URL('/', window.location.origin)
      url.searchParams.set('v', 'map')
      url.searchParams.set('type', 'heat')
      url.searchParams.set('fid', regionId)
      router.push(url.toString(), { scroll: false })
    },
    [router]
  )

  if (alerts.isLoading || !alerts.data) return null

  return (
    <>
      <ul
        className="govuk-list govuk-!-font-size-16 mb-1 flex max-w-[80%] flex-wrap gap-1"
        aria-label="Weather health alerts by region"
      >
        {alerts.data.map((alert) => (
          <AlertListItem
            key={alert.geography_code}
            name={alert.geography_name}
            status={alert.status}
            isHovered={debouncedHoveredRegion === alert.geography_code}
            isAnyHovered={debouncedHoveredRegion !== null}
            onMouseEnter={() => handleMouseEnter(alert.geography_code)}
            onMouseLeave={handleMouseLeave}
            onClick={(evt) => {
              evt.preventDefault()
              evt.stopPropagation()
              handleClick(alert.geography_code)
            }}
          />
        ))}
      </ul>
      <div>
        <svg
          role="application"
          aria-label="Map of weather health alerts"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 272 323"
          className="absolute right-3 top-2 hidden h-[calc(100%-20px)] min-[560px]:block"
        >
          {Object.keys(regionPaths).map((regionCode) => {
            const alert = alerts.data?.find((foundAlert) => foundAlert.geography_code === regionCode)
            if (!alert) return null
            return (
              <MapRegion
                key={regionCode}
                id={alert.geography_code}
                status={alert.status}
                isHovered={debouncedHoveredRegion === regionCode}
                isAnyHovered={debouncedHoveredRegion !== null}
                onMouseEnter={() => handleMouseEnter(regionCode)}
                onMouseLeave={handleMouseLeave}
                onClick={(evt) => {
                  evt.preventDefault()
                  evt.stopPropagation()
                  handleClick(regionCode)
                }}
              />
            )
          })}
        </svg>
      </div>
      <button type="button" className="govuk-!-margin-top-3 flex">
        <RightArrowCircleIcon />
        <div className="govuk-link ml-2 font-bold">Enter Fullscreen</div>
      </button>
    </>
  )
}
