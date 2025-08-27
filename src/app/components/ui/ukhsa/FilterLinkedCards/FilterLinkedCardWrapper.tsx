import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const SubplotFilterCardContainer = dynamic(
  () => import('@/app/components/ui/ukhsa/FilterLinkedCards/SubplotFilterCardContainer'),
  { ssr: false }
)
const TimeSeriesFilterCardsContainer = dynamic(
  () => import('@/app/components/ui/ukhsa/FilterLinkedCards/TimeSeriesFilterCardsContainer'),
  { ssr: false }
)

export async function FilterLinkedCardWrapper({ cardType }: { cardType: string }) {
  if (cardType === 'subplot') {
    return (
      <Suspense fallback={null}>
        <SubplotFilterCardContainer />
      </Suspense>
    )
  } else if (cardType === 'time-series') {
    return (
      <Suspense fallback={null}>
        <TimeSeriesFilterCardsContainer />
      </Suspense>
    )
  }
}
