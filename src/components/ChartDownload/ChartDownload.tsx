import { BLACK } from 'govuk-colours'
import { Button } from 'govuk-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FormEvent, useState } from 'react'

import { api } from '@/api/api-utils'
import type { Chart } from '@/api/models/cms/Page'
import { chartExportApiRoutePath, chartExportFormat } from '@/config/constants'
import { logger } from '@/lib/logger'
import { COLOURS } from '@/styles/Theme'
import { downloadFile } from '@/utils/downloadFile'

import { DownloadButton, IconWrapper } from './ChartDownload.styles'

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
      const { data } = await api.post<Blob>(
        chartExportApiRoutePath,
        {
          format: chartExportFormat,
          plots: chart.map((plot) => plot.value),
        },
        { responseType: 'blob' }
      )

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
        as={DownloadButton}
        buttonColour={COLOURS.BUTTON_GREY}
        buttonTextColour={BLACK}
        buttonShadowColour={BLACK}
        data-loading={downloading}
      >
        <IconWrapper>{downloading ? t('downloadingBtn') : t('downloadBtn')}</IconWrapper>
      </Button>
    </form>
  )
}
