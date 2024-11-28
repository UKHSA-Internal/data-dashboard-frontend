'use client'

import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { z } from 'zod'

import { FormField } from '@/api/models/cms/Page/FormFields'

import { handler } from '../utils/handler'
import CheckboxField from './Fields/Checkbox/CheckboxField'
import CheckboxesField from './Fields/Checkboxes/CheckboxesField'
import DropdownField from './Fields/Dropdown/DropdownField'
import EmailField from './Fields/Email/EmailField'
import MultilineField from './Fields/Multiline/MultilineField'
import NumberField from './Fields/Number/NumberField'
import RadioField from './Fields/Radio/RadioField'
import SinglelineField from './Fields/Singleline/SinglelineField'
import UrlField from './Fields/Url/UrlField'

const initialState = {
  message: '',
  errors: {},
}

export interface Fieldtype {
  label: string
  helpText: string
  cleanName: string
  choicesList?: string[]
  defaultValue?: string
  defaultValuesList?: string[]
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
  default_value: defaultValue,
}: z.infer<typeof FormField>) => {
  const choicesList = choices.includes('\r\n') ? choices.split('\r\n') : choices.split(',')
  // Implement default values only for checkboxes
  const defaultValuesList = defaultValue.includes('\r\n') ? defaultValue.split('\r\n') : defaultValue.split(',')

  return (
    <Fragment key={id}>
      {fieldType === 'singleline' && <SinglelineField label={label} helpText={helpText} cleanName={cleanName} />}

      {fieldType === 'multiline' && <MultilineField label={label} helpText={helpText} cleanName={cleanName} />}

      {fieldType === 'radio' && (
        <RadioField label={label} helpText={helpText} cleanName={cleanName} choicesList={choicesList} />
      )}

      {fieldType === 'email' && <EmailField label={label} helpText={helpText} cleanName={cleanName} />}

      {fieldType === 'checkbox' && (
        <CheckboxField label={label} helpText={helpText} cleanName={cleanName} defaultValue={defaultValue} />
      )}

      {fieldType === 'checkboxes' && (
        <CheckboxesField
          label={label}
          helpText={helpText}
          cleanName={cleanName}
          choicesList={choicesList}
          defaultValuesList={defaultValuesList}
        />
      )}

      {fieldType === 'number' && <NumberField label={label} helpText={helpText} cleanName={cleanName} />}

      {fieldType === 'url' && <UrlField label={label} helpText={helpText} cleanName={cleanName} />}

      {fieldType === 'dropdown' && (
        <DropdownField label={label} helpText={helpText} cleanName={cleanName} choicesList={choicesList} />
      )}
    </Fragment>
  )
}
