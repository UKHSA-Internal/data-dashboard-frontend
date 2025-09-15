import clsx from 'clsx'
import { Trans } from 'react-i18next/TransWithoutContext'

import { getServerTranslation } from '@/app/i18n'

interface HeadingProps {
  lastUpdated?: string
  heading: string
  className?: string
}

export const Heading = async ({ lastUpdated, heading, className }: HeadingProps) => {
  const { t } = await getServerTranslation('common')

  return (
    <Trans
      i18nKey="entryTitle"
      t={t}
      components={[
        <span className="govuk-visually-hidden" key={0} />,
        <h1
          className={clsx('govuk-heading-xl', className, {
            'govuk-!-margin-bottom-4': !lastUpdated,
            'govuk-!-margin-bottom-2': lastUpdated,
          })}
          key={1}
        >
          {heading}
        </h1>,
      ]}
      values={{ value: heading }}
    />
  )
}
