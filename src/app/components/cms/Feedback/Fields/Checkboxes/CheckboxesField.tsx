import { Fieldtype } from '../../Feedback'

export default function CheckboxesField({
  label,
  helpText,
  cleanName,
  choicesList = [],
  defaultValuesList = [],
}: Fieldtype) {
  return (
    <div className="govuk-form-group govuk-!-margin-bottom-9">
      <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h2 className="govuk-fieldset__heading">
            <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
              {label}
            </label>
          </h2>
        </legend>

        {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

        <div className="govuk-checkboxes" data-module="govuk-checkboxes">
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
