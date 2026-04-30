'use client'
import clsx from 'clsx'
import fetch from 'cross-fetch'
import { useRouter } from 'next/navigation'
import { FormEvent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { downloadFile } from '@/app/utils/download.utils'
import { subplotChartExportApiRoutePath } from '@/config/constants'
interface SubplotDownloadFormProps {
  chart: Record<string, unknown>
  xAxis: string
  tagManagerEventId: string | null
  isNonPublic?: boolean
}

export function SubplotDownloadForm({ chart, xAxis, tagManagerEventId, isNonPublic }: SubplotDownloadFormProps) {
  const [downloading, setDownloading] = useState(false)
  const [showDownloadBanner, setShowDownloadBanner] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')

  const formatInputId = useId()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isNonPublic && !showDownloadBanner) {
      setShowDownloadBanner(true)
      return
    }
    if (downloading) return

    setDownloading(true)

    try {
      const formData = new FormData(event.currentTarget)

      const res = await fetch(subplotChartExportApiRoutePath as string, {
        method: 'POST',
        body: formData,
      })

      if (res.redirected !== true) {
        const data = await res.text()
        if (data) downloadFile(`ukhsa-chart-download.${formData.get('file_format')}`, new Blob([data]))
      }

      setDownloading(false)
    } catch (_error) {
      setDownloading(false)
      router.replace('/error')
    }
  }

  const handleCancel = () => {
    setShowDownloadBanner(false)
  }

  return (
    <form
      action={subplotChartExportApiRoutePath}
      method="POST"
      data-testid="download-form"
      onSubmit={handleSubmit}
      aria-label="Download"
      data-tag-manager-event-id={tagManagerEventId}
    >
      <div className="govuk-form-group govuk-!-margin-bottom-0">
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h3 className="govuk-fieldset__heading">
              {showDownloadBanner ? t('cms.blocks.download.headingAlert') : t('cms.blocks.download.heading')}
            </h3>
          </legend>
          <div className={clsx('govuk-hint', showDownloadBanner && 'hidden')}>{t('cms.blocks.download.hint')}</div>
          <div className="govuk-radios govuk-radios--small govuk-radios--inline">
            <div className="govuk-radios__item">
              <input
                className={clsx('govuk-radios__input', showDownloadBanner && 'hidden')}
                id={`format-${formatInputId}`}
                name="file_format"
                type="radio"
                value="csv"
                defaultChecked
              />
              <label
                className={clsx('govuk-label govuk-radios__label', showDownloadBanner && 'hidden')}
                htmlFor={`format-${formatInputId}`}
              >
                {t('cms.blocks.download.inputLabel', { context: 'csv' })}
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className={clsx('govuk-radios__input', showDownloadBanner && 'hidden')}
                id={`format-${formatInputId}-2`}
                name="file_format"
                type="radio"
                value="json"
              />
              <label
                className={clsx('govuk-label govuk-radios__label', showDownloadBanner && 'hidden')}
                htmlFor={`format-${formatInputId}-2`}
              >
                {t('cms.blocks.download.inputLabel', { context: 'json' })}
              </label>
            </div>
          </div>
          {showDownloadBanner && (
            <div
              className="download-acknowledgement-banner"
              role="region"
              aria-label="Download official-sensitive data warning"
            >
              <p className="download-acknowledgement-banner-body govuk-!-margin-bottom-2">
                You are about to download data that contains <b>official-sensitive data.</b>
              </p>
              <p className="download-acknowledgement-banner-body">
                Select <b>“continue and download”</b> to proceed or <b>“back”</b> to cancel.
              </p>
            </div>
          )}
          {xAxis && <input type="hidden" name="x_axis" value={xAxis} data-testid="download-x-axis" />}

          {chart && (
            <>
              <input
                type="hidden"
                name="chart_parameters"
                value={JSON.stringify(chart.chart_parameters)}
                data-testid="download-form-chart_parameters"
              />
              <input
                type="hidden"
                name="subplots"
                value={JSON.stringify(chart.subplots)}
                data-testid="download-form-subplots"
              />
            </>
          )}
        </fieldset>
        <div className="flex gap-2">
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
            {downloading
              ? t('cms.blocks.download.buttonDownloading')
              : showDownloadBanner
                ? t('cms.blocks.download.buttonDownloadAlert')
                : t('cms.blocks.download.buttonDownload')}
          </button>
          {showDownloadBanner && (
            <button
              className="govuk-button govuk-!-margin-bottom-0 govuk-!-margin-top-4 hover:!bg-gray-800 w-auto !bg-black !text-white print:hidden"
              type="button"
              onClick={handleCancel}
            >
              Back
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
