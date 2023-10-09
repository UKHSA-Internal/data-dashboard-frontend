'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import type { Chart } from '@/api/models/cms/Page'
import { downloadFile } from '@/app/utils/download.utils'
import { chartExportApiRoutePath, chartExportFormat } from '@/config/constants'

interface DownloadProps {
  chart: Chart
}

export function Download({ chart }: DownloadProps) {
  const [downloading, setDownloading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (downloading) return // Prevent the button being clicked multiple times whilst downloading

    setDownloading(true)

    try {
      const formData = new FormData(event.currentTarget)

      const res = await global.fetch(chartExportApiRoutePath, {
        method: 'post',
        body: formData,
      })

      const data = await res.text()

      if (data) downloadFile(`data.${chartExportFormat}`, new Blob([data]))

      setDownloading(false)
    } catch (error) {
      setDownloading(false)
      router.replace('/error')
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

      <button
        className="govuk-link govuk-body govuk-!-margin-bottom-0 bg-download bg-[left_center] bg-no-repeat pl-5 text-blue hover:bg-download_dark hover:text-dark-blue print:hidden"
        type="submit"
      >
        {downloading ? 'Downloading (csv)' : 'Download (csv)'}
      </button>
    </form>
  )
}
