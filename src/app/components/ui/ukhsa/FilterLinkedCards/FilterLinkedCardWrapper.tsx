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
  if (cardType !== 'subplot' && cardType !== 'time-series') {
    return undefined
  }

  return (
    <Suspense fallback={null}>
      <div className="mb-3 sm:mb-6 lg:mb-0 lg:w-full">
        {cardType === 'subplot' && <SubplotFilterCardContainer />}
        {cardType === 'time-series' && <TimeSeriesFilterCardsContainer />}
      </div>
    </Suspense>
  )
}
