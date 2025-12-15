'use client'

import Link from 'next/link'
import { Fragment, useActionState, useEffect } from 'react'
import { z } from 'zod'

import { FormField } from '@/api/models/cms/Page/FormFields'

import CheckboxField from './Fields/Checkbox/CheckboxField'
import CheckboxesField from './Fields/Checkboxes/CheckboxesField'
import DateField from './Fields/Date/DateField'
import DropdownField from './Fields/Dropdown/DropdownField'
import EmailField from './Fields/Email/EmailField'
import MultilineField from './Fields/Multiline/MultilineField'
import NumberField from './Fields/Number/NumberField'
import RadioField from './Fields/Radio/RadioField'
import SinglelineField from './Fields/Singleline/SinglelineField'
import UrlField from './Fields/Url/UrlField'
import { handler } from './utils/handler'

const initialState = {
  message: '',
  errors: [],
}

export interface Fieldtype {
  label: string
  helpText: string
  cleanName: string
  choicesList?: string[]
  defaultValue?: string
  defaultValuesList?: string[]
  fieldHasError?: boolean
}

interface FieldError {
  clean_name: string
  label: string
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
                <li key={item.clean_name}>
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
  const [state, formAction] = useActionState(handler.bind(null, formFields), initialState)

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

export const renderFormFields = (
  errors: FieldError[],
  {
    id,
    clean_name: cleanName,
    label,
    field_type: fieldType,
    help_text: helpText,
    // TODO: Required validation added in ticket CDD-2300
    // required,
    choices,
    default_value: defaultValue,
  }: z.infer<typeof FormField>
) => {
  const choicesList = choices.includes('\r\n') ? choices.split('\r\n') : choices.split(',')

  // TODO: Implement default values only for checkboxes
  const defaultValuesList = defaultValue.includes('\r\n') ? defaultValue.split('\r\n') : defaultValue.split(',')

  // Checks if any errors are present, type conversion to boolean
  const fieldHasError = !!errors.find(({ clean_name }) => clean_name === cleanName)

  return (
    <Fragment key={id}>
      {fieldType === 'singleline' && (
        <SinglelineField label={label} helpText={helpText} cleanName={cleanName} fieldHasError={fieldHasError} />
      )}

      {fieldType === 'multiline' && (
        <MultilineField label={label} helpText={helpText} cleanName={cleanName} fieldHasError={fieldHasError} />
      )}

      {fieldType === 'radio' && (
        <RadioField
          label={label}
          helpText={helpText}
          cleanName={cleanName}
          choicesList={choicesList}
          fieldHasError={fieldHasError}
        />
      )}

      {fieldType === 'email' && (
        <EmailField label={label} helpText={helpText} cleanName={cleanName} fieldHasError={fieldHasError} />
      )}

      {fieldType === 'checkbox' && (
        <CheckboxField
          label={label}
          helpText={helpText}
          cleanName={cleanName}
          defaultValue={defaultValue}
          fieldHasError={fieldHasError}
        />
      )}

      {fieldType === 'checkboxes' && (
        <CheckboxesField
          label={label}
          helpText={helpText}
          cleanName={cleanName}
          choicesList={choicesList}
          defaultValuesList={defaultValuesList}
          fieldHasError={fieldHasError}
        />
      )}

      {fieldType === 'number' && (
        <NumberField label={label} helpText={helpText} cleanName={cleanName} fieldHasError={fieldHasError} />
      )}

      {fieldType === 'url' && (
        <UrlField label={label} helpText={helpText} cleanName={cleanName} fieldHasError={fieldHasError} />
      )}

      {fieldType === 'date' && (
        <DateField label={label} helpText={helpText} cleanName={cleanName} fieldHasError={fieldHasError} />
      )}

      {fieldType === 'dropdown' && (
        <DropdownField
          label={label}
          helpText={helpText}
          cleanName={cleanName}
          choicesList={choicesList}
          fieldHasError={fieldHasError}
        />
      )}
    </Fragment>
  )
}
