'use client'

import Link from 'next/link'

interface ChartEmptyProps {
  resetHref: string
  labels: {
    description: string
    reset: string
  }
}

export function ChartEmpty({ labels, resetHref }: ChartEmptyProps) {
  return (
    <div className="govuk-body text-center">
      <p>{labels.description}</p>
      <Link className="govuk-link govuk-link--no-visited-state" href={resetHref} scroll={false}>
        {labels.reset}
      </Link>
    </div>
  )
}
