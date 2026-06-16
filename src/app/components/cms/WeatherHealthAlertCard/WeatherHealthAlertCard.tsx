import clsx from 'clsx'

import { hasSource, SourceFooter } from '@/app/components/cms/SourceFooter/SourceFooter'
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
  const showSource = hasSource(value.source)

  return (
    <div
      className={clsx(
        'mb-3 sm:mb-6 lg:mb-0 lg:w-2/3 xl:w-1/2',
        // Used by the PopularTopicsCard height-sync wrapper to keep the optional Source at the bottom.
        'govuk-!-padding-5 ukhsa-chart-card flex h-full flex-col border border-grey-2 bg-[var(--colour-home-chart-background)] transition-colors duration-200 ukhsa-focus focus-within:border-grey-2 focus-within:bg-[var(--colour-home-chart-background-hover)] hover:bg-[var(--colour-home-chart-background-hover)]',
        '[&_a.ukhsa-chart-card]:!border-0 [&_a.ukhsa-chart-card]:!bg-transparent [&_a.ukhsa-chart-card]:!p-0',
        className
      )}
    >
      <MiniMapCard title={value.title} subTitle={value.sub_title} alertType={value.alert_type as 'heat' | 'cold'} />
      {value.description && (
        <p className="govuk-body-s govuk-!-margin-top-2 govuk-!-margin-bottom-2">{value.description}</p>
      )}
      {showSource && (
        <SourceFooter
          source={value.source}
          resolvePageHref={getPath}
          className="govuk-!-margin-top-2 mt-auto"
          testId="weather-health-alert-source"
        />
      )}
    </div>
  )
}
