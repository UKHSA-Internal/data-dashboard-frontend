import clsx from 'clsx'

import { Fieldtype } from '../../Feedback'

export default function CheckboxesField({
  label,
  helpText,
  cleanName,
  fieldHasError,
  choicesList = [],
  defaultValuesList = [],
}: Fieldtype) {
  return (
    <div className={clsx('govuk-form-group govuk-!-margin-bottom-9', { 'govuk-form-group--error': fieldHasError })}>
      <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h2 className="govuk-fieldset__heading">
            <label
              className={clsx('govuk-label govuk-label--m', { 'govuk-error-message': fieldHasError })}
              htmlFor={cleanName}
            >
              {label}
            </label>
          </h2>
        </legend>

        {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

        {fieldHasError ? (
          <p id="multiline-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> Please select at least one of the below options
          </p>
        ) : null}

        <div className="govuk-checkboxes" data-module="govuk-checkboxes" id={cleanName}>
          {choicesList.map((choiceVal, key) => {
            const uniqueId = `${cleanName}-${key}` // Generate a unique ID for each checkbox
            return (
              <div key={key} className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id={uniqueId}
                  name={cleanName}
                  type="checkbox"
                  value={choiceVal}
                  defaultChecked={defaultValuesList.includes(choiceVal)}
                />
                <label className="govuk-label govuk-checkboxes__label" htmlFor={uniqueId}>
                  {choiceVal}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
