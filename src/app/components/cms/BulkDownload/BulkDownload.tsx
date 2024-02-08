import { bulkExportApiRoutePath, bulkExportFormat } from '@/config/constants'

export async function BulkDownload() {
  return (
    <form action={bulkExportApiRoutePath} method="POST" aria-label="Bulk downloads">
      <input type="hidden" name="file_format" value={bulkExportFormat} />
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
        Download (zip)
      </button>
    </form>
  )
}
