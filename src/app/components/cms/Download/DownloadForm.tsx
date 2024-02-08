'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

import type { Chart } from '@/api/models/cms/Page'
import { downloadFile } from '@/app/utils/download.utils'
import { chartExportApiRoutePath, chartExportFormat } from '@/config/constants'

interface DownloadFormProps {
  chart: Chart
}

export function DownloadForm({ chart }: DownloadFormProps) {
  const [downloading, setDownloading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const areaType = searchParams.get('areaType')
  const areaName = searchParams.get('areaName')

  const hasSelectedArea = areaType && areaName

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
    <form
      action={chartExportApiRoutePath}
      method="POST"
      data-testid="download-form"
      onSubmit={handleSubmit}
      aria-label="Download"
    >
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
            geography_type: hasSelectedArea ? areaType : value.geography_type,
            geography: hasSelectedArea ? areaName : value.geography,
            date_from: value.date_from,
            date_to: value.date_to,
            age: value.age,
            sex: value.sex,
          })}
          data-testid="download-form-plots"
        />
      ))}

      <button
        className="govuk-button govuk-button--primary govuk-!-margin-bottom-0 flex w-auto items-center gap-2 print:hidden"
        type="submit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" aria-hidden>
          <path fill="currentColor" d="M7 0h2v11H7zM0 16v-2h16v2z" />
          <path fill="currentColor" d="M8.414 12.11 7 10.698 11.696 6l1.414 1.414z" />
          <path fill="currentColor" d="M9 11H7V1h2z" />
          <path fill="currentColor" d="M3 7.414 4.414 6l4.696 4.696-1.414 1.414z" />
          <path fill="currentColor" d="M7.168 11.574 7.742 11l.889.889-.574.574z" />
        </svg>
        {downloading ? 'Downloading (csv)' : 'Download (csv)'}
      </button>
    </form>
  )
}
