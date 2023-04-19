import { VisuallyHidden } from 'govuk-react'
import { Heading } from './HeadlineValue.styles'
import { useTranslation } from 'next-i18next'

interface HeadlineValueProps {
  heading: string
  value: string
}

export const HeadlineValue = ({ heading, value }: HeadlineValueProps) => {
  const { t } = useTranslation('common')

  return (
    <>
      <VisuallyHidden as={'div'}>
        {t('metrics.headlineValueScreenReaderText', {
          heading,
          value,
        })}
      </VisuallyHidden>
      <div aria-hidden>
        <Heading>{heading}</Heading>
        {value}
      </div>
    </>
  )
}
