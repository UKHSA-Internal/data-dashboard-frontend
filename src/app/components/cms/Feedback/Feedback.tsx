'use client'

import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { z } from 'zod'

import { FormField } from '@/api/models/cms/Page/FormFields'
import EmailField from '@/app/components/cms/Feedback/EmailField'

import { handler } from '../utils/handler'

const initialState = {
  message: '',
  errors: {},
}

export interface Fieldtype {
  label: string
  helpText: string
  cleanName: string
  choices?: string
  defaultValue?: string
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

export default function Feedback({ formFields }: FeedbackProps) {
  const [state, formAction] = useFormState(handler, initialState)

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
      <form className="govuk-grid-column-two-thirds" action={formAction}>
        {formFields.map(renderFormFields)}
        {state.message}
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

export const renderFormFields = ({
  id,
  clean_name: cleanName,
  label,
  field_type: fieldType,
  help_text: helpText,
  // TODO: Required validation added in ticket CDD-2300
  // required,
  choices,
}: z.infer<typeof FormField>) => {
  const choicesList = choices.includes('\r\n') ? choices.split('\r\n') : choices.split(',')

  // TODO: Implement default values only for checkboxes
  //const defaultValuesList = defaultValue.includes('\r\n') ? defaultValue.split('\r\n') : defaultValue.split(',')

  return (
    <Fragment key={id}>
      {fieldType === 'singleline' && (
        <div className="govuk-form-group govuk-!-margin-bottom-9">
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
              {label}
            </label>
          </h2>

          {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

          <textarea className="govuk-textarea" name={cleanName} id={cleanName} rows={1}></textarea>
        </div>
      )}

      {fieldType === 'multiline' && (
        <div className="govuk-form-group govuk-!-margin-bottom-9">
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor={cleanName}>
              {label}
            </label>
          </h2>

          {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

          <textarea className="govuk-textarea" name={cleanName} id={cleanName} rows={5} />
        </div>
      )}

      {fieldType === 'radio' && (
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">{label}</h2>
          </legend>
          <div className="govuk-radios" data-module="govuk-radios">
            {choicesList.map((choice, key) => {
              return (
                <div key={key} className="govuk-radios__item">
                  <input className="govuk-radios__input" id={cleanName} name={cleanName} type="radio" value={choice} />
                  <label className="govuk-label govuk-radios__label" htmlFor={cleanName}>
                    {choice}
                  </label>
                </div>
              )
            })}
          </div>
        </fieldset>
      )}

      {fieldType === 'email' && <EmailField label={label} helpText={helpText} cleanName={cleanName} />}
    </Fragment>
  )
}
