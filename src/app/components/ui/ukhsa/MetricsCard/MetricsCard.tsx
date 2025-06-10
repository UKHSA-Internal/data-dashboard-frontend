import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import {
  SummaryList,
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from '@/app/components/ui/ukhsa/SummaryList/SummaryList'
import { getServerTranslation } from '@/app/i18n'

interface MetricsCardProps {
  title: string
  href: string
  description: string
  group: string
  topic: string
  metric: string
}

export async function MetricsCard({ title, href, description, group, topic, metric }: MetricsCardProps) {
  const { t } = await getServerTranslation('metrics')  as any;

  return (
    <li className="govuk-summary-card">
      <div className="govuk-summary-card__title-wrapper">
        <h2 className="govuk-summary-card__title">
          <Trans
            t={t}
            i18nKey="metricTitle"
            components={[
              <Link
                key={0}
                className="govuk-heading-s govuk-!-margin-0 govuk-link--no-visited-state no-underline"
                href={href}
              >
                <span className="govuk-visually-hidden" />
              </Link>,
            ]}
            values={{ value: title }}
          />
        </h2>
      </div>
      <Trans
        t={t}
        i18nKey="metricDescription"
        components={[
          <p
            key={0}
            className="govuk-body-s govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-top-3 govuk-!-margin-bottom-0"
          >
            <span className="govuk-visually-hidden" />
          </p>,
        ]}
        values={{ value: description }}
      />

      <div className="govuk-summary-card__content">
        <SummaryList>
          <SummaryListRow>
            <SummaryListKey className="govuk-body-s">Category</SummaryListKey>
            <SummaryListValue className="govuk-body-s capitalize">{group}</SummaryListValue>
          </SummaryListRow>
          <SummaryListRow>
            <SummaryListKey className="govuk-body-s">Topic</SummaryListKey>
            <SummaryListValue className="govuk-body-s">{topic}</SummaryListValue>
          </SummaryListRow>
          <SummaryListRow>
            <SummaryListKey className="govuk-body-s">API name</SummaryListKey>
            <SummaryListValue className="govuk-body-s">
              <code>{metric}</code>
            </SummaryListValue>
          </SummaryListRow>
        </SummaryList>
      </div>
    </li>
  )
}
