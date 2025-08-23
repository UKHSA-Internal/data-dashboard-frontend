'use client'

import { Card } from '../Card/Card'

interface FilterCardProps {
  children: any;
}

const FilterCard = ({ children}: FilterCardProps) => {
  const id = "testing"
  const title = "card title"
  const description = "card description"

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
            <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{description}</p>
          </header>

          {children}

        </article>
      </Card>
    </div>
  )
}

export default FilterCard