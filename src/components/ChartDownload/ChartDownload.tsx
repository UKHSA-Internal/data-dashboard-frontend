import { DownloadButton, IconWrapper } from './ChartDownload.styles'
import { FormEvent, useState } from 'react'
import { chartExportApiRoutePath, chartExportFormat } from '@/config/constants'

import { BLACK } from 'govuk-colours'
import { Button } from 'govuk-react'
import { COLOURS } from '@/styles/Theme'
import type { Chart } from '@/api/models/cms/Page'
import { downloadFile } from '@/utils/downloadFile'
import ky from 'ky-universal'
import { logger } from '@/lib/logger'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

/**
 * Progressively enhanced download component that submits a POST request via an HTML form
 */
interface ChartDownloadProps {
  chart: Chart
}

export const ChartDownload = ({ chart }: ChartDownloadProps) => {
  const { t } = useTranslation('common')
  const [downloading, setDownloading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (downloading) return // Prevent the button being clicked multiple times whilst downloading

    setDownloading(true)

    try {
      const res = await ky.post(chartExportApiRoutePath, {
        json: {
          format: chartExportFormat,
          plots: chart.map((plot) => plot.value),
        },
      })

      const data = await res.blob()

      downloadFile(`data.${chartExportFormat}`, data)

      setDownloading(false)
    } catch (error) {
      logger.error(error)
      setDownloading(false)
      router.replace('/500')
    }
  }

  return (
    <form action={chartExportApiRoutePath} method="POST" data-testid="download-form" onSubmit={handleSubmit}>
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
        $downloading={downloading}
        as={DownloadButton}
        buttonColour={COLOURS.BUTTON_GREY}
        buttonTextColour={BLACK}
        buttonShadowColour={BLACK}
      >
        <IconWrapper>{downloading ? t('downloadingBtn') : t('downloadBtn')}</IconWrapper>
      </Button>
    </form>
  )
}
