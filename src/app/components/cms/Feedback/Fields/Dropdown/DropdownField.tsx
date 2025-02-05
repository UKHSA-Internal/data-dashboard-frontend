import clsx from 'clsx'

import { Fieldtype } from '../../Feedback'

export default function DropdownField({ label, helpText, cleanName, fieldHasError, choicesList = [] }: Fieldtype) {
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
          <span className="govuk-visually-hidden">Error:</span> Please select a value from the dropdown as this field is
          required
        </p>
      ) : null}

      <select className="govuk-select" id={cleanName} name={cleanName} aria-describedby={helpText}>
        <option value="" data-testid="submit-button">
          Choose an option
        </option>
        {choicesList.map((choice, key) => {
          return (
            <option key={key} value={choice}>
              {choice}
            </option>
          )
        })}
      </select>
    </div>
  )
}
