import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { clsx } from '@/lib/clsx'

interface StatusSelectProps {
  id: string
  name: string
  defaultValue?: StatusCodes
  className?: string
  hint?: string
  label?: string
}

export function StatusSelect({ className, id, name, defaultValue, hint, label = 'Status' }: StatusSelectProps) {
  return (
    <div className={clsx(className, 'govuk-form-group mb-0 w-1/2')}>
      <label className="govuk-label" htmlFor={id}>
        <strong>{label}</strong>
        {hint ? <div className="govuk-hint">{hint}</div> : null}
      </label>
      <select className="govuk-select" id={id} name={name} defaultValue={defaultValue}>
        <option value={StatusCodes.OK}>
          {StatusCodes.OK} &ndash; {getReasonPhrase(StatusCodes.OK)}
        </option>
        <option value={StatusCodes.BAD_REQUEST}>
          {StatusCodes.BAD_REQUEST} &ndash; {getReasonPhrase(StatusCodes.BAD_REQUEST)}
        </option>
        <option value={StatusCodes.UNAUTHORIZED}>
          {StatusCodes.UNAUTHORIZED} &ndash; {getReasonPhrase(StatusCodes.UNAUTHORIZED)}
        </option>
        <option value={StatusCodes.INTERNAL_SERVER_ERROR}>
          {StatusCodes.INTERNAL_SERVER_ERROR} &ndash; {getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)}
        </option>
      </select>
    </div>
  )
}
