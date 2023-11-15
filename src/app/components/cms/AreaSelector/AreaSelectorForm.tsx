'use client'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Initial form state
  const [values, setValues] = useState({
    areaType: searchParams.get('areaType') ?? '',
    areaName: searchParams.get('areaName') ?? '',
  })

  // Set default form state when the url is cleared after clicking the "Reset" link
  useEffect(() => {
    if (!Boolean(searchParams.size)) {
      setValues({ areaType: '', areaName: '' })
      formRef.current?.reset()
    }
  }, [searchParams])

  return (
    <form
      ref={formRef}
      action={pathname}
      method="get"
      className="flex flex-wrap items-end justify-center gap-3 sm:flex-nowrap sm:justify-start sm:gap-4"
      onSubmit={(evt) => {
        evt.preventDefault()
        const updatedSearchParams = new URLSearchParams(values)
        router.push(`${pathname}?${updatedSearchParams.toString()}`, { scroll: false })
      }}
    >
      <div className="flex w-full gap-3 sm:max-w-xl sm:gap-4">
        <div className="w-1/2">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
            <h3 className="govuk-fieldset__heading">{labels.areaType}</h3>
          </legend>
          <select
            className="govuk-select w-full min-w-0 max-w-sm"
            name="areaType"
            defaultValue={values.areaType || ''}
            onChange={(evt) => setValues({ ...values, areaType: evt.target.value })}
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

        <div className="w-1/2">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
            <h3 className="govuk-fieldset__heading">{labels.areaName}</h3>
          </legend>
          <select
            disabled={!values.areaType}
            className="govuk-select w-full min-w-0 max-w-sm"
            name="areaName"
            defaultValue={values.areaName || ''}
            onChange={(evt) => setValues({ ...values, areaName: evt.target.value })}
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

      <button className="govuk-button mb-[2px]" type="submit">
        {labels.updateBtn}
      </button>

      <Link
        className="govuk-link--no-visited-state govuk-!-margin-bottom-2"
        href={pathname}
        onClick={() => {
          setValues({ areaType: '', areaName: '' })
          formRef.current?.reset()
        }}
      >
        {labels.resetBtn}
      </Link>
    </form>
  )
}
