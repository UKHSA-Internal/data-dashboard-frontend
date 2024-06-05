import {
  SummaryList,
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from '@/app/components/ui/ukhsa/SummaryList/SummaryList'

interface MetricsSummaryProps {
  topic: string
  group: string
  metric: string
}

export default function MetricsSummary({ topic, group, metric }: MetricsSummaryProps) {
  return (
    <SummaryList className="govuk-!-width-two-thirds">
      <SummaryListRow>
        <SummaryListKey>Topic</SummaryListKey>
        <SummaryListValue>{topic}</SummaryListValue>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Category</SummaryListKey>
        <SummaryListValue>{group}</SummaryListValue>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>API name</SummaryListKey>
        <SummaryListValue>
          <code>{metric}</code>
        </SummaryListValue>
      </SummaryListRow>
    </SummaryList>
  )
}
