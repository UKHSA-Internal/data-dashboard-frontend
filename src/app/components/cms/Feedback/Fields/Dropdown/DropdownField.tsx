import { Fieldtype } from '../../Feedback'

export default function DropdownField({ label, helpText, cleanName, choices = '' }: Fieldtype) {
  const choicesList = choices.includes('\r\n') ? choices.split('\r\n') : choices.split(',')
  return (
    <div className="govuk-form-group govuk-!-margin-bottom-9">
      <h2 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
          {label}
        </label>
      </h2>

      {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

      <select className="govuk-select" id={cleanName} name={cleanName} aria-describedby={helpText}>
        <option value="choose an option" data-testid="submit-button">
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
