'use client'
import clsx from 'clsx'
import fetch from 'cross-fetch'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useId, useState } from 'react'

import type { Chart } from '@/api/models/cms/Page'
import { DualCategoryChartCardValue } from '@/api/models/cms/Page'
import { useTranslation } from '@/app/i18n/client'
import { downloadFile } from '@/app/utils/download.utils'
import { chartExportApiRoutePath, dualCategoryChartExportApiRoutePath } from '@/config/constants'

interface SingleCategoryProps {
  chart: Chart
  xAxis?: string | null
  confidenceIntervals?: boolean
  dualCategoryData?: never
}

interface DualCategoryProps {
  chart?: never
  xAxis?: never
  confidenceIntervals?: never
  dualCategoryData: DualCategoryChartCardValue
}

type DownloadFormProps = (SingleCategoryProps | DualCategoryProps) & {
  tagManagerEventId: string | null
  isPublic?: boolean
  authEnabled?: boolean
}

export function DownloadForm({
  chart,
  xAxis,
  dualCategoryData,
  confidenceIntervals = false,
  tagManagerEventId,
  isPublic = true,
  authEnabled,
}: DownloadFormProps) {
  const [downloading, setDownloading] = useState(false)
  const [showDownloadBanner, setShowDownloadBanner] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation('common')

  const areaType = searchParams.get('areaType')
  const areaName = searchParams.get('areaName')
  const hasSelectedArea = areaType && areaName

  const formatInputId = useId()
  const isDual = dualCategoryData !== undefined
  const formAction = isDual ? dualCategoryChartExportApiRoutePath : chartExportApiRoutePath

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (authEnabled && isPublic === false && showDownloadBanner === false) {
      setShowDownloadBanner(true)
      return
    }
    if (downloading) return // Prevent the button being clicked multiple times whilst downloading

    setDownloading(true)

    try {
      const formData = new FormData(event.currentTarget)
      formData.append('is_public', isPublic.toString())

      const res = await fetch(formAction, {
        method: 'post',
        body: formData,
      })

      const data = await res.text()

      if (data) downloadFile(`ukhsa-chart-download.${formData.get('file_format')}`, new Blob([data]))

      setDownloading(false)
    } catch (_error) {
      setDownloading(false)
      router.replace('/error')
    }
  }

  const handleCancel = () => {
    setShowDownloadBanner(false)
  }

  const dualCategorySerializedData = isDual
    ? JSON.stringify({
        x_axis: dualCategoryData.x_axis,
        y_axis: dualCategoryData.y_axis,
        x_axis_title: dualCategoryData.x_axis_title,
        y_axis_title: dualCategoryData.y_axis_title,
        y_axis_minimum_value: dualCategoryData.y_axis_minimum_value,
        y_axis_maximum_value: dualCategoryData.y_axis_maximum_value,
        chart_type: dualCategoryData.chart_type,
        static_fields: {
          ...dualCategoryData.static_fields,
          geography_type: hasSelectedArea ? areaType : dualCategoryData.static_fields.geography_type,
          geography: hasSelectedArea ? areaName : dualCategoryData.static_fields.geography,
        },
        primary_field_values: dualCategoryData.primary_field_values,
        secondary_category: dualCategoryData.secondary_category,
        segments: dualCategoryData.segments.map(({ value }) => value),
      })
    : null

  return (
    <form
      action={formAction}
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
            <div role="region" aria-label="Download official sensitive data warning">
              <p className="govuk-!-margin-bottom-2">
                You are about to download data that contains <b>official sensitive data.</b>
              </p>
              <p>
                Select <b>&quot;continue and download&quot;</b> to proceed or <b>&quot;back&quot;</b> to cancel.
              </p>
            </div>
          )}

          {isDual ? (
            <input
              type="hidden"
              name="dual_category_data"
              value={dualCategorySerializedData ?? ''}
              data-testid="download-form-dual-category-data"
            />
          ) : (
            <>
              {xAxis && <input type="hidden" name="x_axis" value={xAxis} data-testid="download-x-axis" />}
              <input
                type="hidden"
                name="confidence_intervals"
                value={confidenceIntervals ? 'true' : 'false'}
                data-testid="download-confidence-intervals"
              />
              {chart?.map(({ id, value }) => (
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
