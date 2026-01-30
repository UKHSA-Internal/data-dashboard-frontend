'use client'
import fetch from 'cross-fetch'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useId, useState } from 'react'

import type { Chart } from '@/api/models/cms/Page'
import { useTranslation } from '@/app/i18n/client'
import { downloadFile } from '@/app/utils/download.utils'
import { chartExportApiRoutePath } from '@/config/constants'

interface DownloadFormProps {
  chart: Chart
  xAxis?: string | null
  tagManagerEventId: string | null
  confidenceIntervals?: boolean
}

export function DownloadForm({ chart, xAxis, tagManagerEventId, confidenceIntervals = false }: DownloadFormProps) {
  const [downloading, setDownloading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation('common')

  const areaType = searchParams.get('areaType')
  const areaName = searchParams.get('areaName')
  const hasSelectedArea = areaType && areaName

  const formatInputId = useId()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (downloading) return // Prevent the button being clicked multiple times whilst downloading

    setDownloading(true)

    try {
      const formData = new FormData(event.currentTarget)

      const res = await fetch(chartExportApiRoutePath, {
        method: 'post',
        body: formData,
      })

      const data = await res.text()

      if (data) downloadFile(`ukhsa-chart-download.${formData.get('format')}`, new Blob([data]))

      setDownloading(false)
    } catch (_error) {
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
      data-tag-manager-event-id={tagManagerEventId}
    >
      <div className="govuk-form-group govuk-!-margin-bottom-0">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h3 className="govuk-fieldset__heading">{t('cms.blocks.download.heading')}</h3>
          </legend>
          <div className="govuk-hint">{t('cms.blocks.download.hint')}</div>
          <div className="govuk-radios govuk-radios--small govuk-radios--inline">
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id={`format-${formatInputId}`}
                name="format"
                type="radio"
                value="csv"
                defaultChecked
              />
              <label className="govuk-label govuk-radios__label" htmlFor={`format-${formatInputId}`}>
                {t('cms.blocks.download.inputLabel', { context: 'csv' })}
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id={`format-${formatInputId}-2`}
                name="format"
                type="radio"
                value="json"
              />
              <label className="govuk-label govuk-radios__label" htmlFor={`format-${formatInputId}-2`}>
                {t('cms.blocks.download.inputLabel', { context: 'json' })}
              </label>
            </div>
          </div>

          {xAxis && <input type="hidden" name="x_axis" value={xAxis} data-testid="download-x-axis" />}

          <input
            type="hidden"
            name="confidence_intervals"
            value={confidenceIntervals ? 'true' : 'false'}
            data-testid="download-confidence-intervals"
          />

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
        </fieldset>

        <button
          className="govuk-button govuk-button--primary govuk-!-margin-bottom-0 govuk-!-margin-top-4 flex w-auto items-center gap-2 print:hidden"
          type="submit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" aria-hidden>
            <path fill="currentColor" d="M7 0h2v11H7zM0 16v-2h16v2z" />
            <path fill="currentColor" d="M8.414 12.11 7 10.698 11.696 6l1.414 1.414z" />
            <path fill="currentColor" d="M9 11H7V1h2z" />
            <path fill="currentColor" d="M3 7.414 4.414 6l4.696 4.696-1.414 1.414z" />
            <path fill="currentColor" d="M7.168 11.574 7.742 11l.889.889-.574.574z" />
          </svg>
          {downloading ? t('cms.blocks.download.buttonDownloading') : t('cms.blocks.download.buttonDownload')}
        </button>
      </div>
    </form>
  )
}
