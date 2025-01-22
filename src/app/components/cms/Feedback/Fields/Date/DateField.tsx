import { Fieldtype } from '../../Feedback'

export default function DateField({ label, helpText, cleanName }: Fieldtype) {
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset" role="group">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
              {label}
            </label>
          </h2>
          {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}
        </legend>
        <div className="govuk-date-input" id="passport-issued">
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="day">
                Day
              </label>
              <input
                className="govuk-input govuk-date-input__input govuk-input--width-2"
                id="day"
                name="day"
                type="number"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="month">
                Month
              </label>
              <input
                className="govuk-input govuk-date-input__input govuk-input--width-2"
                id="month"
                name="month"
                type="number"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor="year">
                Year
              </label>
              <input
                className="govuk-input govuk-date-input__input govuk-input--width-4"
                id="year"
                name="year"
                type="number"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
