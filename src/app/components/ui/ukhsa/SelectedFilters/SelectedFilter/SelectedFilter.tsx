'use client'

import CrossIcon from '../../Icons/CrossIcon'

interface SelectedFilterProps {
  name: string
  onRemove: (name: string) => void
}

export function SelectedFilter({ name, onRemove }: SelectedFilterProps) {
  return (
    <button
      onClick={() => onRemove(name)}
      className="govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-bottom-2 relative border-DEFAULT border-black bg-white text-black no-underline ukhsa-focus"
    >
      {name}
      <span className="govuk-!-margin-left-2 inline-block">
        <CrossIcon />
      </span>
    </button>
  )
}
