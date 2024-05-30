import { flag } from '@unleash/nextjs'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { AlertBanner } from '@/app/components/ui/ukhsa/AlertBanner/AlertBanner'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import {
  SummaryList,
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from '@/app/components/ui/ukhsa/SummaryList/SummaryList'
import { flags } from '@/app/constants/flags.constants'
import { useTranslation } from '@/app/i18n'
import { extractHealthAlertTypeFromSlug, getTagVariantFromStatus } from '@/app/utils/weather-health-alert.utils'
import { clsx } from '@/lib/clsx'

export async function generateMetadata() {
  const { enabled } = await flag(flags.adverseWeather)

  if (!enabled)
    return {
      title: 'Page not found | UKHSA data dashboard',
      description: 'Error - Page not found',
    }

  return {
    title: 'Weather health alert page',
    description: 'Weather health alert description',
  }
}

interface WeatherHealthAlertProps {
  params: {
    weather: 'heat-health-alerts' | 'cold-health-alerts'
    region: string
  }
}

export default async function Alert({ params: { weather } }: WeatherHealthAlertProps) {
  const type: HealthAlertTypes = extractHealthAlertTypeFromSlug(weather)
  const { t } = await useTranslation('adverseWeather')

  return (
    <View
      heading="Weather alert for East Midlands"
      lastUpdated="2 mar 2024 16:00"
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Adverse Weather', link: '/adverse-weather' },
        { name: 'Heat Health Alerts', link: '/adverse-weather/heat-health-alerts' },
        { name: 'East Midlands', link: '/adverse-weather/heat-health-alerts/east-midlands' },
      ]}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop"></div>

        <div className="govuk-grid-column-three-quarters-from-desktop">
          <AlertBanner type={'heat'} level={'Amber'} />

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-three-quarters-from-desktop">
              <SummaryList>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.typeKey')}</SummaryListKey>
                  <SummaryListValue>{t('map.alertDialog.typeValue', { context: 'heat' })}</SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.statusKey')}</SummaryListKey>
                  <SummaryListValue>
                    <div className={clsx(`govuk-tag capitalize`, getTagVariantFromStatus('Amber'))}>Amber</div>
                  </SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.dateKey')}</SummaryListKey>
                  <SummaryListValue>6 May 2024 at 12:00pm</SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.expiryKey')}</SummaryListKey>
                  <SummaryListValue>8 May 2024 at 12:00pm</SummaryListValue>
                </SummaryListRow>
              </SummaryList>
            </div>
          </div>
          <div className="govuk-body-s">
            <h3 className="govuk-heading-s govuk-!-margin-bottom-2">{t('map.alertDialog.textKey')}</h3>
            <div
              className="govuk-body [&_li]:mb-2 [&_li]:ml-4 [&_li]:list-disc [&_li]:text-left [&_ul]:py-0"
              dangerouslySetInnerHTML={{
                __html: `Significant impacts are expected across the health and social care sector due to the high temperatures,
            including: observed increase in mortality across the population likely, particularly in the 65+ age group or
            those with health conditions, but impacts may also be seen in younger age groups; increased demand for
            remote health care services likely; internal temperatures in care settings (hospitals and care homes) may
            exceed recommended threshold for clinical risk assessment; impact on ability of services to be delivered due
            to heat effects on workforce possible and many indoor environments likely to be overheating, risk to
            vulnerable people living independently in community as well as in care settings; medicines management
            issues; staffing issues due to external factors (e.g. transport); cross system demand for temporary AC
            capacity being exceeded possible and other sectors starting to be observe impacts (e.g. travel delays).`,
              }}
            />
          </div>
        </div>

        <div className="govuk-grid-column-one-quarter-from-desktop">
          <RelatedLinks variant="sidebar">
            <RelatedLink title="Adverse weather help" url="/" />
            <RelatedLink title="What to do in adverse weather" url="/" />
          </RelatedLinks>
        </div>
      </div>

      {/* TODO: Once the alert page is integrated with the API endpoints, fill in the regionId below */}
      <HealthAlertsLink regionId="E12000004" type={type} className="govuk-!-margin-bottom-5" />
    </View>
  )
}
