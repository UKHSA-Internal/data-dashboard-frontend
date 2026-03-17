'use client'
import Link from 'next/link'
import React, { useActionState, useState } from 'react'

import { RichText } from '@/app/components/cms/RichText/RichText'
import { handleFormSubmit } from '@/app/hooks/useAcknowledgement'

export type FormProps = {
  iAgreeCheckboxLabel?: string
  termsOfServiceError?: string
  disagreeButtonText?: string
  agreeButtonText?: string
  body: string
  terms_of_service_link: string
  terms_of_service_link_text?: string
}

export const renderErrorSummary = (errorMessage: string) => {
  return (
    <div className="govuk-error-summary" data-module="govuk-error-summary">
      <div role="alert">
        <h2 className="govuk-error-summary__title">
          <span className="govuk-visually-hidden">Error:</span>There is a problem
        </h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            <li>
              <a href="#acknowledgement">{errorMessage}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Form({
  iAgreeCheckboxLabel,
  termsOfServiceError,
  disagreeButtonText,
  agreeButtonText,
  body,
  terms_of_service_link,
  terms_of_service_link_text,
}: FormProps) {
  const [state, formAction] = useActionState(handleFormSubmit, {})
  const [isChecked, setIsChecked] = useState(false)
  const [clientError, setClientError] = useState<string | null>(null)
  const showError = (state.error || clientError) && !isChecked
  const errorMessage = state.error || clientError
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsChecked(checked)
    if (checked) setClientError(null)
  }

  return (
    <form action={formAction}>
      {showError && errorMessage && renderErrorSummary(errorMessage)}
      <input type="hidden" name="termsOfServiceError" value={termsOfServiceError} />
      <div className="govuk-!-margin-bottom-6">
        <RichText data-testId="text-body">{body}</RichText>
        <Link data-testId="terms-link" href={terms_of_service_link} className="govuk-link">
          {terms_of_service_link_text}
        </Link>
      </div>
      <div className="govuk-checkboxes__item mb-6">
        <input
          className="govuk-checkboxes__input"
          id="acknowledgement"
          name="acknowledgement"
          type="checkbox"
          value="agreed"
          checked={isChecked}
          onChange={handleCheckboxChange}
          aria-describedby={showError ? 'acknowledgement-error' : undefined}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor="acknowledgement">
          <b>{iAgreeCheckboxLabel}</b>
        </label>
      </div>

      <div>
        <button
          name="action"
          value="disagreed"
          className="govuk-button govuk-button--start govuk-!-margin-right-3 bg-black text-white"
          type="submit"
        >
          {disagreeButtonText}
        </button>
        <button
          name="action"
          value="agree"
          className="govuk-button govuk-button--start"
          type="submit"
          onClick={(e) => {
            if (!isChecked) {
              e.preventDefault()
              setClientError(termsOfServiceError ?? 'You must accept the terms')
            }
          }}
        >
          {agreeButtonText}
          <svg
            className="govuk-button__start-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17.5"
            height="19"
            viewBox="0 0 33 40"
          >
            <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
          </svg>
        </button>
      </div>
    </form>
  )
}
