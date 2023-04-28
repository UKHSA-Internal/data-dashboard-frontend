import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { HeadlineValue, Metric } from '@/components/Metrics'

interface HeadlineProps {
  heading: string
  headlineData: Awaited<ReturnType<typeof extractAndFetchPageData>>['headlines'][number]
}

export const Headline = ({ heading, headlineData }: HeadlineProps) => {
  if (!headlineData) {
    throw new Error('Missing data in Headline CMS Component - Check the headline is generated in getStaticProps')
  }

  if (headlineData.success) {
    const {
      data: { value },
    } = headlineData
    return (
      <Metric>
        <HeadlineValue heading={heading} value={String(value)} />
      </Metric>
    )
  }

  // TODO - Handle error state
  return null
}
