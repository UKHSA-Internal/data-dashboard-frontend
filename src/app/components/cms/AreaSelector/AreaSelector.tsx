import { Topics } from '@/api/models'
import { getGeographies } from '@/api/requests/geographies/getGeographies'
import { useTranslation } from '@/app/i18n'
import { logger } from '@/lib/logger'

import { AreaSelectorForm } from './AreaSelectorForm'

interface AreaSelectorProps {
  areaType: string | undefined
  selectedTopics: Topics[]
}

export async function AreaSelector({ areaType, selectedTopics }: AreaSelectorProps) {
  const { t } = await useTranslation('common')

  const geographiesResponse = await getGeographies(selectedTopics[0])

  // Don't show the area selector if we fail to get the geography types
  if (!geographiesResponse.success) {
    logger.error('Could not load area selector %s', geographiesResponse.error)
    return <></>
  }

  const areaTypeOptions = geographiesResponse.data.map((geography) => geography.geography_type)
  const areaNameOptions = []

  if (areaType) {
    const selectedGeography = geographiesResponse.data.find((geography) => geography.geography_type === areaType)

    if (selectedGeography) {
      areaNameOptions.push(...selectedGeography.geographies.map((area) => area.name))
    }
  }

  return (
    <AreaSelectorForm
      areaType={areaType}
      areaTypeOptions={areaTypeOptions}
      areaNameOptions={areaNameOptions}
      // TODO: CDD-1479 - Investgiate how we can consume i18n inside client components
      // so that we don't need to pass in the values as props like this from the server component
      labels={{
        areaType: t('areaSelector.areaType'),
        areaTypePlaceholder: t('areaSelector.areaTypePlaceholder'),
        areaName: t('areaSelector.areaName'),
        areaNamePlaceholder: t('areaSelector.areaNamePlaceholder'),
        updateBtn: t('areaSelector.updateBtn'),
        resetBtn: t('areaSelector.resetBtn'),
      }}
    />
  )
}

export * from './AreaSelectorLoader'
