import { VisuallyHidden } from 'govuk-react'
import { useTranslation } from 'next-i18next'
import { ComponentProps } from 'react'

import { Trend } from '@/components/Trend/Trend'

import { Heading } from './HeadlineTrend.styles'

interface HeadlineTrendProps {
  heading: string
  change: number
  percentage: number
  direction: ComponentProps<typeof Trend>['direction']
  colour: ComponentProps<typeof Trend>['colour']
}

export const HeadlineTrend = ({ heading, change, percentage, ...trendProps }: HeadlineTrendProps) => {
  const { t } = useTranslation('common')

  const value = t('metrics.headlineTrendValue', { change, percentage })

  return (
    <>
      <VisuallyHidden as={'div'}>
        {t('metrics.headlineTrendScreenReaderText', {
          heading,
          value,
          context: `${trendProps.colour}_${trendProps.direction}`,
        })}
      </VisuallyHidden>
      <div aria-hidden>
        <Heading>{heading}</Heading>
        <Trend value={value} {...trendProps} />
      </div>
    </>
  )
}
