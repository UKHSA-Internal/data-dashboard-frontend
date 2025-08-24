'use client'

import { Card } from '../Card/Card'

import { getMinMaxYears, MinMaxYear } from '@/app/utils/time-period.utils'
import { GeographyParent, getParentGeography } from '@/app/utils/geography.utils'

interface FilterCardProps {
  timePeriod: any;
  children: any;
}

const FilterCard = ({ timePeriods, cardData, geography, children }: FilterCardProps) => {
  const id = "testing"

  const minMaxDateRange: MinMaxYear = getMinMaxYears(timePeriods)
  const geographyParent: GeographyParent | null = getParentGeography(geography)
  const title = `${cardData.title_prefix} between ${minMaxDateRange.minDate} - ${minMaxDateRange.maxDate} (${geographyParent!.geography_name}, ${geography.name})`

  return (
    <div className="mb-4">
      <Card
        asChild
        aria-labelledby={`chart-row-card-heading-${id}`}
        className="ukhsa-chart-card flex flex-col gap-6"
      >
        <article>

          <header>
            <h3 id={`chart-row-card-heading-${id}`} className="govuk-heading-m mb-2 font-bold">
              {title}
            </h3>
            <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">latest date</p>
          </header>

          <h1>{cardData.legend_title}</h1>
          {children}

        </article>
      </Card>
    </div>
  )
}

export default FilterCard