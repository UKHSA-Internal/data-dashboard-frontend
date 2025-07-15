// 'use client'

import CrossIcon from '../../Icons/CrossIcon'

interface SelectedFilterProps {
  name: string
}

const handleFilterRemove = (name: string) => {
  console.log(`Handling removal of filter ${name}`)
}

export function SelectedFilter({ name }: SelectedFilterProps) {
  return (
    <button
      onClick={() => handleFilterRemove(name)}
      className="govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-bottom-2 relative border-DEFAULT border-black bg-white text-black no-underline ukhsa-focus"
    >
      {name}
      <span className="govuk-!-margin-left-2 inline-block">
        <CrossIcon />
      </span>
    </button>
  )
}
