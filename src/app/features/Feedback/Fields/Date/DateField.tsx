import clsx from 'clsx'
import { useState } from 'react'

import { Fieldtype } from '../../Feedback'

interface DateData {
  day: string
  month: string
  year: string
}

export default function DateField({ label, helpText, cleanName, fieldHasError }: Readonly<Fieldtype>) {
  const [dateData, setDateData] = useState<DateData>({
    day: '',
    month: '',
    year: '',
  })

  const hiddenDateInput =
    dateData.day && dateData.month && dateData.year ? `${dateData.day}-${dateData.month}-${dateData.year}` : ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setDateData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className={clsx('govuk-form-group govuk-!-margin-bottom-9', { 'govuk-form-group--error': fieldHasError })}>
      {/* Hidden input field for collecting date in format dd-mm-yyyy */}
      <input
        aria-label="Unused Hidden Date Input"
        className="govuk-visually-hidden"
        name={cleanName}
        type="text"
        value={hiddenDateInput}
      />
      <fieldset className="govuk-fieldset" role="group">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h2 className="govuk-label-wrapper">
            <label
              className={clsx('govuk-label govuk-label--m', { 'govuk-error-message': fieldHasError })}
              htmlFor={cleanName}
            >
              {label}
            </label>
          </h2>
          {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}
        </legend>

        {fieldHasError ? (
          <p id="multiline-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> Please enter a valid date
          </p>
        ) : null}

        <div className="govuk-date-input" id={cleanName}>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="day">
                Day
              </label>
              <input
                className={clsx('govuk-input govuk-date-input__input govuk-input--width-2', {
                  'govuk-textarea--error': fieldHasError,
                })}
                id="day"
                name="day" // Bind name directly to the key
                value={dateData.day} // Bind to dateData.day
                onChange={handleChange}
                type="number"
                inputMode="numeric"
                min={1}
                max={31}
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="month">
                Month
              </label>
              <input
                className={clsx('govuk-input govuk-date-input__input govuk-input--width-2', {
                  'govuk-textarea--error': fieldHasError,
                })}
                id="month"
                name="month"
                value={dateData.month}
                onChange={handleChange}
                type="number"
                inputMode="numeric"
                min={1}
                max={12}
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="year">
                Year
              </label>
              <input
                className={clsx('govuk-input govuk-date-input__input govuk-input--width-4', {
                  'govuk-textarea--error': fieldHasError,
                })}
                id="year"
                name="year"
                value={dateData.year}
                onChange={handleChange}
                type="number"
                inputMode="numeric"
                min={1900}
                max={2100}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
