import { PropsWithChildren } from 'react'

import { clsx } from '@/lib/clsx'

interface PhaseBannerProps extends PropsWithChildren {
  tag: string
  className?: string
  variant?: 'default' | 'light'
}

export function PhaseBanner({ children, tag, variant = 'default', className }: PhaseBannerProps) {
  return (
    <div
      className={clsx('govuk-phase-banner', className, {
        '[&>*]:text-white border-0': variant === 'light',
      })}
      data-testid="ukhsa-phase-banner"
    >
      <p className="govuk-phase-banner__content">
        <strong
          className={clsx('govuk-tag govuk-phase-banner__content__tag', {
            'bg-offwhite text-blue font-bold px-2 py-[6px]': variant === 'light',
          })}
        >
          {tag}
        </strong>
        {children}
      </p>
    </div>
  )
}
