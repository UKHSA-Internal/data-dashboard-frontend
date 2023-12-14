interface MetricsSummaryProps {
  topic: string
  group: string
  metric: string
}

export default function MetricsSummary({ topic, group, metric }: MetricsSummaryProps) {
  return (
    <dl className="govuk-summary-list govuk-!-width-two-thirds">
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Topic</dt>
        <dd className="govuk-summary-list__value">{topic}</dd>
      </div>
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Category</dt>
        <dd className="govuk-summary-list__value">{group}</dd>
      </div>
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">API name</dt>
        <dd className="govuk-summary-list__value">
          <code>{metric}</code>
        </dd>
      </div>
    </dl>
  )
}
