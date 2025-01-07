'use client'

import clsx from 'clsx'

import { Fieldtype } from '../../Feedback'

export default function SinglelineField({ label, helpText, cleanName, fieldHasError }: Fieldtype) {
  return (
    <div className={clsx('govuk-form-group govuk-!-margin-bottom-9', { 'govuk-form-group--error': fieldHasError })}>
      <h2 className="govuk-label-wrapper">
        <label
          className={clsx('govuk-label govuk-label--m', { 'govuk-error-message': fieldHasError })}
          htmlFor={cleanName}
        >
          {label}
        </label>
      </h2>

      {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

      {fieldHasError ? (
        <p id="multiline-error" className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> Please select a value as this field is required
        </p>
      ) : null}

      <textarea className="govuk-textarea" name={cleanName} id={cleanName} rows={1}></textarea>
    </div>
  )
}
