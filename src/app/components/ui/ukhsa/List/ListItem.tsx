import { ReactNode } from 'react'

interface ListItemProps {
  children: ReactNode
  showRule?: boolean
  spacing?: 's' | 'm' | 'l'
}

export const ListItem = ({ children, showRule = true, spacing = 'm' }: ListItemProps) => {
  return (
    <li>
      {children}
      {showRule && (
        <hr
          className={`govuk-section-break govuk-section-break--${spacing} govuk-section-break--visible`}
          role="presentation"
        />
      )}
    </li>
  )
}
