import { VisuallyHidden } from 'govuk-react'
import { Heading } from './HeadlineValue.styles'
import { useTranslation } from 'next-i18next'

interface HeadlineValueProps {
  heading: string
  value: number
}

export const HeadlineValue = ({ heading, value }: HeadlineValueProps) => {
  const { t } = useTranslation('common')

  const formattedValue = value.toLocaleString('en-GB')

  return (
    <>
      <VisuallyHidden as={'div'}>
        {t('metrics.headlineValueScreenReaderText', {
          heading,
          value: formattedValue,
        })}
      </VisuallyHidden>
      <div aria-hidden>
        <Heading>{heading}</Heading>
        {formattedValue}
      </div>
    </>
  )
}
