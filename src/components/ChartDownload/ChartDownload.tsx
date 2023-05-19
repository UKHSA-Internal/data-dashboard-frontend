import { Button } from 'govuk-react'
import { BLACK } from 'govuk-colours'
import { useTranslation } from 'next-i18next'
import { chartExportApiRoutePath, chartExportFormat } from '@/config/constants'
import type { Chart } from '@/api/models/cms/Page'
import { COLOURS } from '@/styles/Theme'
import { DownloadButton, IconWrapper } from './ChartDownload.styles'

/**
 * Progressively enhanced download component that submits a POST request via an HTML form
 */
interface ChartDownloadProps {
  chart: Chart
}

export const ChartDownload = ({ chart }: ChartDownloadProps) => {
  const { t } = useTranslation('common')

  return (
    <form action={chartExportApiRoutePath} method="POST" data-testid="download-form">
      <input type="hidden" name="format" value={chartExportFormat} data-testid="download-form-format" />
      {chart.map(({ id, value }) => (
        <input
          key={id}
          type="hidden"
          name="plots"
          value={JSON.stringify({
            topic: value.topic,
            metric: value.metric,
            stratum: value.stratum,
            geography: value.geography,
            geography_type: value.geography_type,
            date_from: value.date_from,
            date_to: value.date_to,
          })}
          data-testid="download-form-plots"
        />
      ))}

      <Button
        type="submit"
        as={DownloadButton}
        buttonColour={COLOURS.BUTTON_GREY}
        buttonTextColour={BLACK}
        buttonShadowColour={BLACK}
        style={{ maxWidth: '105px' }}
      >
        <IconWrapper>{t('downloadBtn')}</IconWrapper>
      </Button>
    </form>
  )
}
