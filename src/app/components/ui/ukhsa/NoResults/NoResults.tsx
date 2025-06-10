import { Trans } from 'react-i18next/TransWithoutContext'

import { getServerTranslation } from '@/app/i18n'

export default async function NoResults() {
  const { t } = await getServerTranslation('metrics') as any;

  return (
    <Trans
      i18nKey="noResults"
      t={t}
      components={[
        <p className="govuk-body govuk-!-font-weight-bold" key={0}></p>,
        <p className="govuk-body" key={1}></p>,
        <ul className="govuk-list govuk-list--bullet" key={2}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>,
      ]}
    />
  )
}
