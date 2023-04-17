import { VisuallyHidden } from 'govuk-react'
import { Heading } from './HeadlineTrend.styles'
import Trend from '@/components/Trend/Trend'
import { useTranslation } from 'next-i18next'
import { ComponentProps } from 'react'

interface HeadlineTrendProps extends ComponentProps<typeof Trend> {
  heading: string
}

export const HeadlineTrend = ({ heading, ...trendProps }: HeadlineTrendProps) => {
  const { t } = useTranslation('common')

  return (
    <>
      <VisuallyHidden as={'div'}>
        {t('metrics.headlineTrendScreenReaderText', {
          heading,
          value: trendProps.value,
          context: `${trendProps.colour}_${trendProps.direction}`,
        })}
      </VisuallyHidden>
      <div aria-hidden>
        <Heading>{heading}</Heading>
        <Trend {...trendProps} />
      </div>
    </>
  )
}
