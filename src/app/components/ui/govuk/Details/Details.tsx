import clsx from 'clsx'
import { forwardRef, HTMLProps, ReactNode } from 'react'

interface DetailsProps extends HTMLProps<HTMLDetailsElement> {
  label: string
  children: ReactNode
  className?: string
}

export const Details = forwardRef<HTMLDetailsElement, DetailsProps>(({ label, children, className, ...rest }, ref) => {
  return (
    <details
      ref={ref}
      className={clsx('govuk-details govuk-!-margin-top-4 govuk-!-margin-bottom-0', className)}
      data-module="govuk-details"
      {...rest}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{label}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  )
})
