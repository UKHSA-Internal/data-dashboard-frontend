'use client'

import { useActionState, useState } from 'react'

import { handleFormSubmit } from '../../../hooks/useAcknowledgement'

export default function AcknowledgementsForm() {
  const [state, formAction] = useActionState(handleFormSubmit, {})
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
  }

  // Only show error if checkbox is not checked
  const showError = state.error && !isChecked

  return (
    <form action={formAction}>
      <div className={`govuk-checkboxes__item mb-6 ${showError ? 'govuk-form-group--error' : ''}`}>
        <input
          className="govuk-checkboxes__input"
          id="acknowledgement"
          name="acknowledgement"
          type="checkbox"
          value="acknowledgement accepted"
          checked={isChecked}
          onChange={handleCheckboxChange}
          aria-describedby={showError ? 'acknowledgement-error' : undefined}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor="acknowledgement">
          <b>I acknowledge that I have read the full terms of service, understood and agree to the above conditions</b>
        </label>

        {
          // Only render error message if there is an error and the checkbox is not checked
          showError && (
            <div>
              <p className="govuk-error-message" id="acknowledgement-error">
                <span className="govuk-visually-hidden">Error:</span> {state.error}
              </p>
            </div>
          )
        }
      </div>

      <div>
        <button
          name="action"
          value="disagree"
          className="govuk-button govuk-button--start govuk-!-margin-right-3"
          style={{ backgroundColor: '#000', boxShadow: '0 2px 0 #000' }}
          type="submit"
        >
          Disagree and exit
        </button>
        <button name="action" value="agree" className="govuk-button govuk-button--start" type="submit">
          Agree and continue
          <svg
            className="govuk-button__start-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17.5"
            height="19"
            viewBox="0 0 33 40"
            aria-hidden="true"
            focusable="false"
          >
            <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
          </svg>
        </button>
      </div>
    </form>
  )
}
