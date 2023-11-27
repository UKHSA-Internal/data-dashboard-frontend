'use client'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

interface AreaSelectorProps {
  areaTypeOptions: string[]
  areaNameOptions: string[]
  labels?: {
    areaType?: string
    areaTypePlaceholder?: string
    areaName?: string
    areaNamePlaceholder?: string
    updateBtn?: string
    resetBtn?: string
  }
}

export function AreaSelectorForm({
  areaTypeOptions,
  areaNameOptions,
  labels = {
    areaType: 'Area type',
    areaTypePlaceholder: 'Select area type',
    areaName: 'Area name',
    areaNamePlaceholder: 'Select area name',
    updateBtn: 'Update',
    resetBtn: 'Reset',
  },
}: AreaSelectorProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const areaTypeSelectRef = useRef<HTMLSelectElement>(null)
  const areaNameSelectRef = useRef<HTMLSelectElement>(null)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const resetForm = useCallback(() => {
    if (areaTypeSelectRef.current && areaNameSelectRef.current) {
      areaTypeSelectRef.current.value = ''
      areaNameSelectRef.current.value = ''
    }
  }, [])

  // Reset form state when the url params get cleared
  useEffect(() => {
    if (!searchParams.get('areaType') && !searchParams.get('areaName')) {
      resetForm()
    }
  }, [searchParams, resetForm])

  const initialPathname = pathname.split('?')[0]

  return (
    <form
      ref={formRef}
      action={initialPathname}
      method="get"
      className="flex flex-wrap items-end justify-center gap-3 sm:flex-nowrap sm:justify-start sm:gap-4"
      aria-label="Area selector"
    >
      <div className="flex w-full gap-3 sm:max-w-xl sm:gap-4">
        <div className="govuk-form-group mb-0 w-1/2">
          <label className="govuk-label" htmlFor="areaType">
            {labels.areaType}
          </label>
          <select
            ref={areaTypeSelectRef}
            className="govuk-select w-full min-w-0 max-w-sm"
            id="areaType"
            name="areaType"
            defaultValue={searchParams.get('areaType') || ''}
            onChange={(evt) => {
              const updatedSearchParams = new URLSearchParams()
              updatedSearchParams.set('areaType', evt.target.value)
              router.push(`${pathname}?${updatedSearchParams.toString()}`, { scroll: false, shallow: true })

              // Reset areaName whenever the areaType changes
              if (areaNameSelectRef.current) {
                areaNameSelectRef.current.value = ''
              }
            }}
          >
            <option value="" disabled>
              {labels.areaTypePlaceholder}
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
            {labels.areaName}
          </label>
          <select
            ref={areaNameSelectRef}
            disabled={!searchParams.has('areaType')}
            className="govuk-select w-full min-w-0 max-w-sm"
            id="areaName"
            name="areaName"
            defaultValue={searchParams.get('areaName') || ''}
            onChange={(evt) => {
              const updatedSearchParams = new URLSearchParams(searchParams)
              updatedSearchParams.set('areaName', evt.target.value)
              router.push(`${pathname}?${updatedSearchParams.toString()}`, { scroll: false })
            }}
          >
            <option value="" disabled>
              {labels.areaNamePlaceholder}
            </option>
            {areaNameOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="govuk-button mb-[2px] hidden no-js:block" type="submit">
        {labels.updateBtn}
      </button>

      <Link
        className="govuk-link--no-visited-state govuk-!-margin-bottom-2 govuk-body mb-0"
        href={initialPathname}
        onClick={() => {
          resetForm()
          areaTypeSelectRef.current?.focus()
        }}
      >
        {labels.resetBtn}
      </Link>
    </form>
  )
}
