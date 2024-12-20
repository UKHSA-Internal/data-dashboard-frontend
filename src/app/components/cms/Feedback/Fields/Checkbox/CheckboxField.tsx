import { Fieldtype } from '../../Feedback'

export default function CheckboxField({ label, helpText, cleanName, defaultValue }: Fieldtype) {
  return (
    <div className="govuk-form-group govuk-!-margin-bottom-9">
      {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}
      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          name={cleanName}
          value={defaultValue}
          type="checkbox"
          id={cleanName}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor={cleanName}>
          {label}
        </label>
      </div>
    </div>
  )
}
