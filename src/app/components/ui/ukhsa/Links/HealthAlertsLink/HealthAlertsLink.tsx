'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { mapQueryKeys } from '@/app/constants/map.constants'
import { useTranslation } from '@/app/i18n/client'
import { clsx } from '@/lib/clsx'

interface HealthAlertsLinkProps {
  type: HealthAlertTypes
  regionId?: string
  className?: string
  buttonText?: string
}

export default function HealthAlertsLink({ className, type, regionId, buttonText }: HealthAlertsLinkProps) {
  const { t } = useTranslation('weatherHealthAlerts')
  const searchParams = useSearchParams()

  const searchParamsWithMap = new URLSearchParams(searchParams)
  searchParamsWithMap.set(mapQueryKeys.view, 'map')
  searchParamsWithMap.set(mapQueryKeys.alertType, type)

  if (regionId) {
    searchParamsWithMap.set(mapQueryKeys.featureId, regionId)
  }

  if (searchParams.has('error') && searchParams.get('error') === 'map') {
    return <p>{t('map.fatalError')}</p>
  }

  return (
    <Link
      className={clsx('govuk-button govuk-button--secondary inline-flex w-auto gap-2 no-js:hidden', className)}
      href={{
        search: searchParamsWithMap.toString(),
      }}
    >
      <svg focusable="false" width="15" height="20" viewBox="0 0 15 20">
        <path
          d="M15,7.5c0.009,3.778 -4.229,9.665 -7.5,12.5c-3.271,-2.835 -7.509,-8.722 -7.5,-12.5c0,-4.142 3.358,-7.5 7.5,-7.5c4.142,0 7.5,3.358 7.5,7.5Zm-7.5,5.461c3.016,0 5.461,-2.445 5.461,-5.461c0,-3.016 -2.445,-5.461 -5.461,-5.461c-3.016,0 -5.461,2.445 -5.461,5.461c0,3.016 2.445,5.461 5.461,5.461Z"
          fill="currentColor"
        ></path>
      </svg>
      {buttonText || t('map.trigger')}
    </Link>
  )
}
