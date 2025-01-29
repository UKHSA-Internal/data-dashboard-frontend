import clsx from 'clsx'

import { Fieldtype } from '../../Feedback'

export default function DateField({ label, helpText, cleanName, fieldHasError }: Fieldtype) {
  return (
    <div className={clsx('govuk-form-group govuk-!-margin-bottom-9', { 'govuk-form-group--error': fieldHasError })}>
      {/*Hidden input field for collecting date in format dd-mm-yyyy*/}
      <input className="govuk-visually-hidden" name={cleanName} id={cleanName} type="text" />
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
            <span className="govuk-visually-hidden">Error:</span> Please select at least one of the below options
          </p>
        ) : null}

        <div className="govuk-date-input" id={cleanName}>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="day">
                Day
              </label>
              <input
                className="govuk-input govuk-date-input__input govuk-input--width-2"
                id="day"
                name={`${cleanName}-day`}
                type="number"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="month">
                Month
              </label>
              <input
                className="govuk-input govuk-date-input__input govuk-input--width-2"
                id="month"
                name={`${cleanName}-month`}
                type="number"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="year">
                Year
              </label>
              <input
                className="govuk-input govuk-date-input__input govuk-input--width-4"
                id="year"
                name={`${cleanName}-year`}
                type="number"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
