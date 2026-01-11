'use client'

import Link from 'next/link'
import { Trans } from 'react-i18next'

export function ChartNoScript({ title }: { title: string }) {
  return (
    <div className="govuk-!-margin-top-4">
      <noscript>
        <Trans
          i18nKey="oneYearNoScript"
          components={{
            1: <Link href={`#download-${title}`}>download</Link>,
          }}
        />
      </noscript>
    </div>
  )
}
