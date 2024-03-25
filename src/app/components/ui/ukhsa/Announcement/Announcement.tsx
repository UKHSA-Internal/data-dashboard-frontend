import clsx from 'clsx'

import { RichText } from '@/app/components/cms'

interface AnnouncementProps {
  variant: 'Information' | 'Warning'
  heading: string
  summary: string
}

export const Announcement = ({ variant, heading, summary }: AnnouncementProps) => {
  return (
    <div
      className={clsx('govuk-inset-text govuk-!-margin-top-0', {
        'border-blue': variant === 'Information',
        'border-red': variant === 'Warning',
      })}
      role="alert"
      aria-live={variant === 'Information' ? 'polite' : 'assertive'}
    >
      <div
        className={clsx('govuk-tag', {
          'govuk-tag--red': variant === 'Warning',
        })}
      >
        {variant}
      </div>
      <div className="govuk-heading-m govuk-!-margin-top-2 govuk-!-margin-bottom-2">{heading}</div>
      <RichText className="[&>p]:mb-0">{`<small>${summary}</small>`}</RichText>
    </div>
  )
}
