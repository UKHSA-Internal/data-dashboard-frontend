'use client'

import clsx from 'clsx'

import { Fieldtype } from '../../Feedback'

export default function MultilineField({ label, helpText, cleanName, fieldHasError }: Fieldtype) {
  return (
    <div className={clsx('govuk-form-group govuk-!-margin-bottom-9', { 'govuk-form-group--error': fieldHasError })}>
      <h2 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
          {label}
        </label>
      </h2>

      {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

      {fieldHasError ? (
        <p id="multiline-error" className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> Please enter a value as this field is required
        </p>
      ) : null}

      <textarea
        className={clsx('govuk-textarea govuk-!-margin-bottom-9', { 'govuk-textarea--error': fieldHasError })}
        name={cleanName}
        id={cleanName}
        rows={5}
      />
    </div>
  )
}
