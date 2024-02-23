import { HTMLProps } from 'react'

import { useTranslation } from '@/app/i18n'
import { downloadApiRoutePath } from '@/config/constants'

interface DownloadButtonProps extends HTMLProps<HTMLFormElement> {
  /** The text to display on the download button. */
  label: string
  /** The specific endpoint to which the download request will be sent. */
  endpoint: string
  /** The HTTP method to be used for the download request, e.g., 'GET' or 'POST'. */
  method: string
  /** The unique identifier to make this download button distinct from others. */
  id: string
  /** A list of supported file formats for the user to choose from. When no formats are provided, it falls back to a default  */
  formats?: string[]
}

/**
 * A React component that renders a button for downloading content. This component creates a form that, when submitted,
 * sends a request to a specified endpoint via a proxy API route.
 *
 * The form includes hidden fields for specifying the file format and endpoint.. This approach
 * allows for a clean and scalable implementation of a download functionality that is integrated with the application's
 * backend architecture.
 *
 * @param props - The properties required to configure the download button, including the button label, the endpoint
 * for the download request, the HTTP method for the request, and any additional HTML properties for the form element.
 * @returns A form element configured as a download button.
 */
export async function DownloadButton({ label, endpoint, method, id, formats, ...props }: DownloadButtonProps) {
  const { t } = await useTranslation('common')

  return (
    <form {...props} action={downloadApiRoutePath} method={method}>
      <input type="hidden" name="endpoint" value={endpoint.replace('/api/', '')} />

      <div className="govuk-form-group govuk-!-margin-bottom-0 govuk-!-margin-top-6">
        {formats && formats?.length > 1 && (
          <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m sr-only">
              <div className="govuk-fieldset__heading">{t('cms.blocks.download.heading')}</div>
            </legend>
            <div className="govuk-hint">{t('cms.blocks.download.hint')}</div>
            <div className="govuk-radios govuk-radios--small govuk-radios--inline">
              {formats.map((format, index) => (
                <div key={format} className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id={`format-${id}-${index}`}
                    name="file_format"
                    type="radio"
                    value={format}
                    defaultChecked={index === 0}
                  />
                  <label className="govuk-label govuk-radios__label" htmlFor={`format-${id}-${index}`}>
                    {t('cms.blocks.download.inputLabel', { context: format })}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        )}

        <button
          className="govuk-button govuk-button--primary govuk-!-margin-bottom-0 govuk-!-margin-top-4 flex w-auto items-center gap-2 print:hidden"
          type="submit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" aria-hidden>
            <path fill="currentColor" d="M7 0h2v11H7zM0 16v-2h16v2z" />
            <path fill="currentColor" d="M8.414 12.11 7 10.698 11.696 6l1.414 1.414z" />
            <path fill="currentColor" d="M9 11H7V1h2z" />
            <path fill="currentColor" d="M3 7.414 4.414 6l4.696 4.696-1.414 1.414z" />
            <path fill="currentColor" d="M7.168 11.574 7.742 11l.889.889-.574.574z" />
          </svg>
          {label}
        </button>
      </div>
    </form>
  )
}
