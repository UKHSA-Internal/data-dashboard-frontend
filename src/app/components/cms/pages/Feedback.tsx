import { z } from 'zod'

import { FormField } from '@/api/models/cms/Page/FormFields'
import { getFeedbackPage } from '@/app/utils/cms'

import { View } from '../../ui/ukhsa'

export default async function FeedbackPage() {
  const { title, form_fields } = await getFeedbackPage()

  return <View heading={title}>{form_fields.map(renderFormFields)}</View>
}

const renderFormFields = ({
  // id,
  // meta: { type },
  // clean_name: cleanName,
  label,
  field_type: fieldType,
  help_text: helpText,
  // required,
  // choices,
  // default_value: defaultValue,
}: z.infer<typeof FormField>) => (
  <form>
    <h2 className="govuk-label-wrapper">
      <label className="govuk-label govuk-label--m" htmlFor="reason">
        {label}
      </label>
    </h2>
    {helpText.length > 0 ? <div className="govuk-hint">{helpText}</div> : null}

    {/* TODO: Render function to decide on which field type */}
    {/* {renderField({ fieldType, required, choices, defaultValue })} */}
    {renderField({ fieldType })}
  </form>
)

const renderField = ({
  fieldType,
  // required,
  // choices,
  // defaultValue,
}: {
  fieldType: string
  // required: boolean
  // choices: string
  // defaultValue: string
}) => (
  <div>
    {fieldType === 'multiline' && <textarea className="govuk-textarea" name="reason" id="reason" rows={5} />}

    {fieldType === 'radio' && (
      <fieldset>
        <legend>
          <h2>Did you find everything you were looking for?</h2>
        </legend>
      </fieldset>
    )}
  </div>
)
