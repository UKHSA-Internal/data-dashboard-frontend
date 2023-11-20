import Link from 'next/link'

interface MetricsCardProps {
  title: string
  slug: string
  description: string
  category: string
  topic: string
  apiName: string
}

export function MetricsCard({ title, slug, description, category, topic, apiName }: MetricsCardProps) {
  return (
    <div className="govuk-summary-card">
      <div className="govuk-summary-card__title-wrapper">
        <h2 className="govuk-summary-card__title">
          <Link className="govuk-heading-s govuk-!-margin-0 no-underline" href={`metrics/${slug}`}>
            {title}
          </Link>
        </h2>
      </div>
      <p className="govuk-body-s govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-top-3 govuk-!-margin-bottom-0">
        {description}
      </p>
      <div className="govuk-summary-card__content">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key govuk-body-s">Category</dt>
            <dd className="govuk-summary-list__value govuk-body-s">{category}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key govuk-body-s">Topic</dt>
            <dd className="govuk-summary-list__value govuk-body-s">{topic}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key govuk-body-s">API name</dt>
            <dd className="govuk-summary-list__value govuk-body-s">
              <code>{apiName}</code>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
