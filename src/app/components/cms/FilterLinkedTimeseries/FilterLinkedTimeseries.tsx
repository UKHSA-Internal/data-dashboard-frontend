import { FilterLinkedCardWrapper } from '@/app/components/ui/ukhsa/FilterLinkedCards/FilterLinkedCardWrapper'

export function FilterLinkedTimeseries() {
  return (
    <div className="mb-3 sm:mb-6 lg:mb-0 lg:w-full">
      <FilterLinkedCardWrapper cardType="time-series" />
    </div>
  )
}
