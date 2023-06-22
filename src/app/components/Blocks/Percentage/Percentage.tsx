import { Metrics, Topics } from '@/api/models'
import { getHeadlines } from '@/api/requests/headlines/getHeadlines'

export async function Percentage({
  heading,
  data,
}: {
  heading: string
  data: { body: string; metric: Metrics; topic: Topics }
}) {
  const res = await getHeadlines(data)

  if (res.success) {
    return (
      <div className="govuk-body mb-0">
        <p className="govuk-body-s font-bold mb-0">{heading}</p>
        {res.data.value}%
      </div>
    )
  }

  return <>headline error</>
}
