import { HTMLProps } from 'react'

import { downloadApiRoutePath, downloadFormat } from '@/config/constants'

interface DownloadButtonProps extends HTMLProps<HTMLFormElement> {
  /** The text to display on the download button. */
  label: string
  /** The specific endpoint to which the download request will be sent. */
  endpoint: string
  /** The HTTP method to be used for the download request, e.g., 'GET' or 'POST'. */
  method: string
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
export async function DownloadButton({ label, endpoint, method, ...props }: DownloadButtonProps) {
  return (
    <form {...props} action={downloadApiRoutePath} method={method}>
      <input type="hidden" name="file_format" value={downloadFormat} />
      <input type="hidden" name="endpoint" value={endpoint.replace('/api/', '')} />
      <button
        className="govuk-button govuk-!-margin-bottom-0 flex w-auto items-center gap-2 print:hidden"
        type="submit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path fill="currentColor" d="M7 0h2v11H7zM0 16v-2h16v2z" />
          <path fill="currentColor" d="M8.414 12.11 7 10.698 11.696 6l1.414 1.414z" />
          <path fill="currentColor" d="M9 11H7V1h2z" />
          <path fill="currentColor" d="M3 7.414 4.414 6l4.696 4.696-1.414 1.414z" />
          <path fill="currentColor" d="M7.168 11.574 7.742 11l.889.889-.574.574z" />
        </svg>
        {label}
      </button>
    </form>
  )
}
