'use client'

import { Fieldtype } from '../../Feedback'

export default function SinglelineField({ label, helpText, cleanName }: Fieldtype) {
  return (
    <div className="govuk-form-group govuk-!-margin-bottom-9">
      <h2 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
          {label}
        </label>
      </h2>

      {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

      <textarea className="govuk-textarea" name={cleanName} id={cleanName} rows={1}></textarea>
    </div>
  )
}
