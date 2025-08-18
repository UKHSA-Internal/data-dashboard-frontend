'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

import { useTranslation } from '@/app/i18n/client'

interface AreaSelectorProps {
  areaType: string | undefined
  areaTypeOptions: string[]
  areaNameOptions: string[]
}

export function AreaSelectorForm({ areaTypeOptions, areaNameOptions }: AreaSelectorProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const areaTypeSelectRef = useRef<HTMLSelectElement>(null)
  const areaNameSelectRef = useRef<HTMLSelectElement>(null)

  const { t } = useTranslation('common')

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const areaType = searchParams.get('areaType')
  const areaName = searchParams.get('areaName')

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('topic.location.change', {
        detail: { loading: false },
      })
    )
  }, [areaType, areaName])

  const resetForm = useCallback(() => {
    if (areaTypeSelectRef.current && areaNameSelectRef.current) {
      areaTypeSelectRef.current.value = ''
      areaNameSelectRef.current.value = ''
      router.refresh()
    }
  }, [router])

  // Reset form state when the url params get cleared
  useEffect(() => {
    if (!areaType && !areaName) {
      resetForm()
    }
  }, [areaType, areaName, resetForm])

  const initialPathname = pathname.split('?')[0]

  return (
    <form
      ref={formRef}
      action={initialPathname}
      method="get"
      className="flex flex-wrap items-end justify-center gap-3 sm:flex-nowrap sm:justify-start sm:gap-4"
      aria-label="Area selector"
      data-testid="Area selector"
    >
      <div className="flex w-full gap-3 sm:max-w-xl sm:gap-4">
        <div className="govuk-form-group mb-0 w-1/2">
          <label className="govuk-label" htmlFor="areaType">
            {t('areaSelector.areaType')}
          </label>
          <select
            ref={areaTypeSelectRef}
            className="govuk-select w-full min-w-0 max-w-sm"
            id="areaType"
            name="areaType"
            defaultValue={searchParams.get('areaType') || ''}
            onChange={(evt) => {
              const updatedSearchParams = new URLSearchParams(searchParams)
              updatedSearchParams.set('areaType', evt.target.value)
              updatedSearchParams.delete('areaName')
              router.push(`${initialPathname}?${updatedSearchParams.toString()}`, { scroll: false })

              // Reset areaName whenever the areaType changes
              if (areaNameSelectRef.current) {
                areaNameSelectRef.current.value = ''
              }
            }}
          >
            <option value="" disabled>
              {t('areaSelector.areaTypePlaceholder')}
            </option>
            {areaTypeOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="govuk-form-group mb-0 w-1/2">
          <label className="govuk-label" htmlFor="areaName">
            {t('areaSelector.areaName')}
          </label>
          <select
            ref={areaNameSelectRef}
            disabled={!searchParams.has('areaType')}
            className="govuk-select w-full min-w-0 max-w-sm"
            id="areaName"
            name="areaName"
            defaultValue={searchParams.get('areaName') || ''}
            onChange={(evt) => {
              window.dispatchEvent(new CustomEvent('topic.location.change', { detail: { loading: true } }))
              const updatedSearchParams = new URLSearchParams(searchParams)
              updatedSearchParams.set('areaName', evt.target.value)
              router.push(`${initialPathname}?${updatedSearchParams.toString()}`, { scroll: false })
            }}
          >
            <>
              <option value="" disabled>
                {t('areaSelector.areaNamePlaceholder')}
              </option>
              {areaNameOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </>
          </select>
        </div>
      </div>

      <button className="govuk-button mb-[2px] hidden no-js:block" type="submit">
        {t('areaSelector.updateBtn')}
      </button>

      <Link
        className="govuk-link--no-visited-state govuk-!-margin-bottom-2 govuk-body mb-0"
        href={initialPathname}
        onClick={() => {
          resetForm()
          areaTypeSelectRef.current?.focus()
        }}
      >
        {t('areaSelector.resetBtn')}
      </Link>
    </form>
  )
}
