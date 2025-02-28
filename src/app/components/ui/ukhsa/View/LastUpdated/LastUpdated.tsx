import { getServerTranslation } from '@/app/i18n'

interface LastUpdatedProps {
  lastUpdated: string
}

export const LastUpdated = async ({ lastUpdated }: LastUpdatedProps) => {
  const { t } = await getServerTranslation('common')

  return <p className="govuk-!-margin-bottom-6 govuk-body-s">{t('lastUpdated', { value: new Date(lastUpdated) })}</p>
}
