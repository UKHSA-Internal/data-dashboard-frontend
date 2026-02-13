'use client'

import { useActionState, useState } from 'react'

import { handleFormSubmit } from '../../../hooks/useAcknowledgement'

export default function DataAcknowledgement() {
  const [state, formAction] = useActionState(handleFormSubmit, {})
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
  }

  // Only show error if checkbox is not checked
  const showError = state.error && !isChecked

  return (
    <div>
      <h1 className="govuk-heading-xl govuk-!-margin-top-2 govuk-!-margin-bottom-4">
        Accessing official sensitive data
      </h1>
      <div className="my-6 border-b border-[#b1b4b6]"></div>
      <h2 className="govuk-heading-l govuk-!-margin-bottom-5">Acknowledgement </h2>
      <div className="bg-gray-50 mb-6 rounded">
        <p className="mb-4">By accessing this dashboard you agree to:</p>
        <ul className="govuk-list govuk-list--bullet text-xl">
          <li>Not share any content with persons that do not have permission to access the none public dashboard</li>
          <li>Not distribute or share any content from the none public dashboard online</li>
          <li>Not leave your workstation un-attended whilst logged into the dashboard</li>
          <li>Only connect using secure networks whilst accessing the none public dashboard</li>
          <li>Ensure the environment you are working in is secure and your screen is not visible to others</li>
        </ul>
        <a href="#terms" className="govuk-link text-xl">
          Read full terms of service here
        </a>
      </div>
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
            <b>
              I acknowledge that I have read the full terms of service, understood and agree to the above conditions
            </b>
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
    </div>
  )
}
