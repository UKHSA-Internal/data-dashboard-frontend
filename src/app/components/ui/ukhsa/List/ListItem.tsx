import { ReactNode } from 'react'

interface ListItemProps {
  children: ReactNode
}

export const ListItem = ({ children }: ListItemProps) => {
  return (
    <li>
      {children}
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
    </li>
  )
}
