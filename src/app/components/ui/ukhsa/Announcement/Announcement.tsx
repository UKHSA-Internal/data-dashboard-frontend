import clsx from 'clsx'

import { RichText } from '@/app/components/cms'

interface AnnouncementProps {
  variant: 'Information' | 'Warning'
  heading: string
  summary: string
  className?: string
}

export const Announcement = ({ variant, heading, summary, className }: AnnouncementProps) => {
  return (
    <div
      className={clsx(
        className,
        'govuk-inset-text govuk-!-margin-top-0 govuk-!-padding-top-1 govuk-!-padding-bottom-1 govuk-!-margin-bottom-0 flex flex-wrap gap-2 sm:gap-0',
        {
          'border-blue': variant === 'Information',
          'border-red': variant === 'Warning',
        }
      )}
      role="alert"
      aria-live={variant === 'Information' ? 'polite' : 'assertive'}
    >
      <div
        className={clsx('govuk-tag govuk-!-margin-right-2 govuk-phase-banner__content__tag h-full', {
          'govuk-tag--red': variant === 'Warning',
        })}
      >
        {variant}
      </div>

      <div className="govuk-heading-s govuk-!-margin-bottom-0">{heading}</div>
      <RichText className="w-full [&>p]:mb-0">{`<small>${summary}</small>`}</RichText>
    </div>
  )
}
