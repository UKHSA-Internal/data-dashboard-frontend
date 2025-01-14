import Link from 'next/link'

import { getServerTranslation } from '@/app/i18n'

interface BackLinkProps {
  backlink: string
}

export const BackLink = async ({ backlink }: BackLinkProps) => {
  const { t } = await getServerTranslation('common')
  return (
    <Link href={backlink} className="govuk-back-link">
      {t('backLink')}
    </Link>
  )
}
