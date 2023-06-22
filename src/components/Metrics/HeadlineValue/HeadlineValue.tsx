import { Heading } from './HeadlineValue.styles'
import { VisuallyHidden } from 'govuk-react'
import { useTranslation } from 'next-i18next'

interface HeadlineValueProps {
  heading: string
  value: number
  percent?: boolean
}

export const HeadlineValue = ({ heading, value, percent }: HeadlineValueProps) => {
  const { t } = useTranslation('common')

  const formattedValue = value.toLocaleString('en-GB')

  return (
    <>
      <VisuallyHidden as={'div'}>
        {t('metrics.headlineValueScreenReaderText', {
          heading,
          value: formattedValue,
          context: percent ? 'percent' : '',
        })}
      </VisuallyHidden>
      <div aria-hidden>
        <Heading>{heading}</Heading>
        {formattedValue}
        {percent && '%'}
      </div>
    </>
  )
}
