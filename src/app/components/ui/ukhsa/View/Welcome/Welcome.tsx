import { getServerTranslation } from '@/app/i18n'

export const ShowWelcome = async () => {
  const { t } = await getServerTranslation('common')

  return <p className="govuk-body-l govuk-!-margin-bottom-1 text-dark-grey">{t('welcome')}</p>
}
