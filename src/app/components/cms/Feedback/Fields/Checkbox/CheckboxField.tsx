import clsx from 'clsx'

import { Fieldtype } from '../../Feedback'

export default function CheckboxField({ label, helpText, cleanName, defaultValue, fieldHasError }: Fieldtype) {
  return (
    <div className={clsx('govuk-form-group govuk-!-margin-bottom-9', { 'govuk-form-group--error': fieldHasError })}>
      {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

      {fieldHasError ? (
        <p id="multiline-error" className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> Please check this field as it is required
        </p>
      ) : null}

      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          id={cleanName}
          name={cleanName}
          value={defaultValue}
          type="checkbox"
        />
        <label
          className={clsx('govuk-label govuk-checkboxes__label', { 'govuk-error-message': fieldHasError })}
          htmlFor={cleanName}
        >
          {label}
        </label>
      </div>
    </div>
  )
}
