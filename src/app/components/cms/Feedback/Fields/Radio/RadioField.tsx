'use client'

import clsx from 'clsx'

import { Fieldtype } from '../../Feedback'

export default function RadioField({ label, helpText, cleanName, choicesList = [], fieldHasError }: Fieldtype) {
  return (
    <div className={clsx('govuk-form-group', { 'govuk-form-group--error': fieldHasError })}>
      <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h2 className="govuk-fieldset__heading">{label}</h2>
        </legend>

        {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

        {fieldHasError ? (
          <p id="multiline-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> Please enter a value as this field is required
          </p>
        ) : null}

        <div className="govuk-radios" data-module="govuk-radios">
          {choicesList.map((choice, key) => {
            return (
              <div key={key} className="govuk-radios__item">
                <input className="govuk-radios__input" id={cleanName} name={cleanName} type="radio" value={choice} />
                <label className="govuk-label govuk-radios__label" htmlFor={cleanName}>
                  {choice}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
