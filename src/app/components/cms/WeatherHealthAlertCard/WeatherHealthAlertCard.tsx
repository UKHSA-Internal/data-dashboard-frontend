import clsx from 'clsx'
import Link from 'next/link'

import { MiniMapCard } from '@/app/components/ui/ukhsa/MiniMap/MiniMapCard'
import { getPath } from '@/app/utils/cms/slug'

type WeatherHealthAlertCardProps = {
  readonly value: {
    readonly title: string
    readonly sub_title: string
    readonly alert_type: string
    readonly description?: string | null
    readonly source?: {
      readonly link_display_text?: string | null
      readonly page?: string | null
      readonly external_url?: string | null
    }
  }
  readonly className?: string
}

export function WeatherHealthAlertCard({ value, className }: WeatherHealthAlertCardProps) {
  const sourceHref = value.source?.page ? getPath(value.source.page) : value.source?.external_url
  const isExternal = Boolean(value.source?.external_url && !value.source?.page)
  const sourceText = value.source?.link_display_text ?? null

  return (
    <div
      className={clsx(
        'mb-3 sm:mb-6 lg:mb-0 lg:w-2/3 xl:w-1/2',
        // Used by the PopularTopicsCard height-sync wrapper to keep the optional Source at the bottom.
        'flex h-full flex-col',
        className
      )}
    >
      <MiniMapCard title={value.title} subTitle={value.sub_title} alertType={value.alert_type as 'heat' | 'cold'} />
      {value.description && (
        <p className="govuk-body-s govuk-!-margin-top-2 govuk-!-margin-bottom-2">{value.description}</p>
      )}
      {sourceHref && value.source && sourceText && (
        <div className="govuk-!-margin-top-2 mt-auto" data-testid="weather-health-alert-source">
          <p className="govuk-body-s mb-0 text-grey-1">
            Source:{' '}
            <Link
              href={sourceHref}
              className="govuk-link govuk-link--no-visited-state"
              {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {sourceText}
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
