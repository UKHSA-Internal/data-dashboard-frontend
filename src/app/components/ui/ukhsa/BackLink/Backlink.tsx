import Link from 'next/link'

import { getServerTranslation } from '@/app/i18n'

export const backlink = async (backLink: string) => {
  const { t } = await getServerTranslation('common')
  return (
    backLink && (
      <Link href={backLink} className="govuk-back-link">
        {t('backLink')}
      </Link>
    )
  )
}
