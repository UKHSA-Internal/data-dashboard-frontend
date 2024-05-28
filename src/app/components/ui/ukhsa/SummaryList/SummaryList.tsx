import React from 'react'

import { clsx } from '@/lib/clsx'

const SummaryList = React.forwardRef<React.ElementRef<'dl'>, React.ComponentPropsWithoutRef<'dl'>>(
  ({ className, ...props }, ref) => <dl ref={ref} className={clsx('govuk-summary-list', className)} {...props} />
)

const SummaryListRow = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={clsx('govuk-summary-list__row', className)} {...props} />
)

const SummaryListKey = React.forwardRef<React.ElementRef<'dt'>, React.ComponentPropsWithoutRef<'dt'>>(
  ({ className, ...props }, ref) => <dt ref={ref} className={clsx('govuk-summary-list__key', className)} {...props} />
)

const SummaryListValue = React.forwardRef<React.ElementRef<'dd'>, React.ComponentPropsWithoutRef<'dd'>>(
  ({ className, ...props }, ref) => <dd ref={ref} className={clsx('govuk-summary-list__value', className)} {...props} />
)

export { SummaryList, SummaryListKey, SummaryListRow, SummaryListValue }
