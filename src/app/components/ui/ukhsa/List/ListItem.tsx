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

export const ListItemArrow = ({ children }: ListItemProps) => {
  return (
    <div className="relative">
      <>{children}</>
      <svg
        className="absolute inset-y-1/2 right-0 -mt-2"
        width="11"
        height="17"
        viewBox="0 0 11 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.22192"
          width="11.6773"
          height="3.14219"
          rx="1.5711"
          transform="rotate(45 2.22192 0)"
          fill="#1D70B8"
        />
        <rect
          x="0.440186"
          y="14.7781"
          width="11.6773"
          height="3.14219"
          rx="1.5711"
          transform="rotate(-45 0.440186 14.7781)"
          fill="#1D70B8"
        />
      </svg>
    </div>
  )
}
