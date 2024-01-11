import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { useTranslation } from '@/app/i18n'

interface MetricsCardProps {
  title: string
  href: string
  description: string
  group: string
  topic: string
  metric: string
}

export async function MetricsCard({ title, href, description, group, topic, metric }: MetricsCardProps) {
  const { t } = await useTranslation('metrics')

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
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key govuk-body-s">Category</dt>
            <dd className="govuk-summary-list__value govuk-body-s capitalize">{group}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key govuk-body-s">Topic</dt>
            <dd className="govuk-summary-list__value govuk-body-s">{topic}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key govuk-body-s">API name</dt>
            <dd className="govuk-summary-list__value govuk-body-s">
              <code>{metric}</code>
            </dd>
          </div>
        </dl>
      </div>
    </li>
  )
}
