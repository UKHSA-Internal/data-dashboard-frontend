import clsx from 'clsx'

import { RichText } from '@/app/components/cms'

import { BannerVariant } from '../GlobalBanner/GlobalBanner'

interface AnnouncementProps {
  variant: BannerVariant
  heading: string
  children: string
  className?: string
}

export const Announcement = ({ variant, heading, children, className }: AnnouncementProps) => {
  return (
    <div
      className={clsx(
        className,
        'govuk-inset-text govuk-!-margin-top-0 govuk-!-padding-top-1 govuk-!-padding-bottom-1 govuk-!-margin-bottom-0 govuk-!-margin-top-0 govuk-!-margin-bottom-1 flex flex-wrap gap-2',
        {
          'border-blue': variant === 'Information',
          'border-red': variant === 'Warning',
        }
      )}
      role={variant === 'Warning' ? 'alert' : 'status'}
    >
      <div
        className={clsx('govuk-tag govuk-!-margin-right-0 govuk-phase-banner__content__tag h-full', {
          'govuk-tag--red': variant === 'Warning',
        })}
      >
        {variant}
      </div>

      <div className="govuk-heading-s govuk-!-margin-bottom-0">{heading}</div>
      <RichText className="w-full [&>p]:mb-0">{`<small>${children}</small>`}</RichText>
    </div>
  )
}
