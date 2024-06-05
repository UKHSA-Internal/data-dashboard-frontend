import clsx from 'clsx'
import { ReactNode } from 'react'

interface ListItemProps {
  children: ReactNode
  showRule?: boolean
  spacing?: 's' | 'm' | 'l'
}

export const ListItem = ({ children, showRule = true, spacing = 'm' }: ListItemProps) => {
  return (
    <li className={clsx({ 'govuk-!-margin-top-2': !showRule })}>
      {children}
      {showRule && (
        <hr
          className={clsx(`govuk-section-break govuk-section-break--${spacing} govuk-section-break--visible`, {
            'govuk-!-margin-top-2 govuk-!-margin-bottom-2': spacing === 's',
          })}
          role="presentation"
        />
      )}
    </li>
  )
}
