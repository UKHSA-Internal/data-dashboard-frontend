import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FilterBanners = dynamic(() => import('./FilterBanners'), { ssr: false })
const StaticFilter = dynamic(() => import('@/app/components/ui/ukhsa/StaticFilter/StaticFilter'), { ssr: false })
const SelectedFilters = dynamic(() => import('@/app/components/ui/ukhsa/SelectedFilters/SelectedFilters'), {
  ssr: false,
})
const FilterDropdowns = dynamic(() => import('@/app/components/ui/ukhsa/FilterDropdowns/FilterDropdowns'), {
  ssr: false,
})

export async function FilterBannerWrapper() {
  return (
    <Suspense fallback={null}>
      <StaticFilter>
        <FilterBanners />
        <SelectedFilters />
        <FilterDropdowns />
      </StaticFilter>
    </Suspense>
  )
}
