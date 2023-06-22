import { getTrends } from '@/api/requests/trends/getTrends'

export async function Trend({ data }: any) {
  const res = await getTrends(data)

  if (res.success) {
    return <div>{res.data.metric_value}</div>
  }

  return <>headline error</>
}
