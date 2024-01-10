import { z } from 'zod'

import { HeadlineNumber } from '@/api/models/cms/Page/Blocks'
import { getHeadlines } from '@/api/requests/headlines/getHeadlines'

import { useTranslation } from '../../../i18n'

interface HeadlineProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof HeadlineNumber>['value']
}

export async function Headline({ data: { body: heading, ...requestParams } }: HeadlineProps) {
  const { t } = await useTranslation('common')

  const headline = await getHeadlines(requestParams)

  if (headline.success) {
    const {
      data: { value },
    } = headline

    return (
      <div>
        <div>{t('cms.blocks.headline.heading', { heading })}</div>
        <div className="govuk-body-l govuk-!-margin-bottom-0">{t('cms.blocks.headline.value', { value })}</div>
      </div>
    )
  }

  return null
}
