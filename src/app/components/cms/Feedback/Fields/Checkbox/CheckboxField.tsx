import { Fieldtype } from '../../Feedback'

export default function CheckboxField({ label, helpText, cleanName, defaultValue }: Fieldtype) {
  return (
    <div className="govuk-form-group govuk-!-margin-bottom-9">
      <h2 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
          {label}
        </label>
      </h2>

      {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}
      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          name={cleanName}
          value={defaultValue}
          type="checkbox"
          id={cleanName}
        />
      </div>
    </div>
  )
}
