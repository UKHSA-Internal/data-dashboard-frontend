import { ReactNode } from 'react'

interface ListItemProps {
  children: ReactNode
  showRule?: boolean
}

export const ListItem = ({ children, showRule }: ListItemProps) => {
  return (
    <li>
      {children}
      {showRule && <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />}
    </li>
  )
}
