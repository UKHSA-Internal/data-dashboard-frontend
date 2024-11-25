'use client'

import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { z } from 'zod'

import { FormField } from '@/api/models/cms/Page/FormFields'

import { handler } from '../utils/handler'

const initialState = {
  message: '',
  errors: [],
}

interface FeedbackProps {
  formFields: {
    id: number
    meta: { type: 'forms.FormField' }
    clean_name: string
    label: string
    field_type: string
    help_text: string
    required: boolean
    choices: string
    default_value: string
  }[]
}

interface FieldError {
  clean_name: string
  label: string
}

export default function Feedback({ formFields }: FeedbackProps) {
  const [state, formAction] = useFormState(handler.bind(null, formFields), initialState)

  useEffect(() => {
    if (state.message) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [state])

  return (
    <div className="govuk-grid-row">
      {state.errors.length > 0 ? renderErrorSummary(state.errors) : null}
      <form className="govuk-grid-column-two-thirds" action={formAction}>
        {formFields.map(renderFormFields.bind(null, state.errors))}

        <div className="govuk-button-group">
          <button className="govuk-button" type="submit">
            Submit
          </button>
          <Link className="govuk-link govuk-link--no-visited-state" href="/">
            Return to home page
          </Link>
        </div>
      </form>
    </div>
  )
}

export const renderErrorSummary = (errors: FieldError[]) => {
  return (
    <div className="govuk-error-summary" data-module="govuk-error-summary">
      <div role="alert">
        <h2 className="govuk-error-summary__title">
          <span className="govuk-visually-hidden">Error:</span>The following form fields have errors:{' '}
        </h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            {errors.map((item) => {
              return (
                <li>
                  <a href={'#' + item.clean_name}>{item.label}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export const renderFormFields = (
  errors: FieldError[],
  {
    id,
    clean_name: cleanName,
    label,
    field_type: fieldType,
    help_text: helpText,
    required,
    choices,
    // default_value: defaultValue,
  }: z.infer<typeof FormField>
) => {
  const choicesList = choices.includes('\r\n') ? choices.split('\r\n') : choices.split(',')

  // TODO: Implement default values only for checkboxes
  // const defaultValuesList = defaultValue.includes('\r\n') ? defaultValue.split('\r\n') : defaultValue.split(',')

  //does field have errors

  const fieldHasError = errors.find(({ clean_name }) => (clean_name === cleanName ? true : false))

  return (
    <Fragment key={id}>
      {fieldType === 'singleline' && (
        <div className="govuk-form-group govuk-!-margin-bottom-9">
          <h2 className="govuk-label-wrapper">
            <label
              className={'govuk-label govuk-label--m' + (fieldHasError ? 'govuk-error-message' : null)}
              htmlFor={cleanName}
            >
              {label}
            </label>
          </h2>

          {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

          {fieldHasError ? (
            <p id="multiline-error" className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span> Please enter a value as this field is required
            </p>
          ) : null}

          <textarea
            className="govuk-textarea govuk-textarea--error"
            name={cleanName}
            id={cleanName}
            rows={1}
          ></textarea>
        </div>
      )}

      {fieldType === 'multiline' && (
        <div className={'govuk-form-group' + (fieldHasError ? '--error ' : null) + 'govuk-!-margin-bottom-9'}>
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
              {label}
            </label>
          </h2>

          {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

          {fieldHasError ? (
            <p id="multiline-error" className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span> Please enter a value as this field is required
            </p>
          ) : null}

          <textarea
            className={'govuk-textarea ' + (fieldHasError ? 'govuk-textarea--error' : null)}
            name={cleanName}
            id={cleanName}
            rows={5}
          />
        </div>
      )}

      {fieldType === 'radio' && (
        <div className={'govuk-form-group govuk-form-group' + (fieldHasError ? '--error ' : null)}>
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
                    <input
                      className="govuk-radios__input"
                      id={cleanName}
                      name={cleanName}
                      type="radio"
                      value={choice}
                    />
                    <label className="govuk-label govuk-radios__label" htmlFor={cleanName}>
                      {choice}
                    </label>
                  </div>
                )
              })}
            </div>
          </fieldset>
        </div>
      )}
    </Fragment>
  )
}
