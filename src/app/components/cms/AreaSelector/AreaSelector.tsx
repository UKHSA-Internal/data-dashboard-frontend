import { getGeographyNames } from '@/api/requests/geographies/getGeographyNames'
import { getGeographyTypes } from '@/api/requests/geographies/getGeographyTypes'
import { useTranslation } from '@/app/i18n'
import { logger } from '@/lib/logger'

import { AreaSelectorForm } from './AreaSelectorForm'

interface AreaSelectorProps {
  areaType: string | undefined
}

export async function AreaSelector({ areaType }: AreaSelectorProps) {
  const { t } = await useTranslation('common')

  const geographyTypesResponse = await getGeographyTypes()

  // Don't show the area selector if we fail to get the geography types
  if (!geographyTypesResponse.success) {
    logger.error('Could not load area selector %s', geographyTypesResponse.error)
    return <></>
  }

  const areaTypeOptions = geographyTypesResponse.data.map((type) => type.name)
  const areaNameOptions = []

  if (areaType) {
    const id = geographyTypesResponse.data.find(({ name }) => name === areaType)?.id

    if (typeof id !== 'undefined') {
      const geographyNamesResponse = await getGeographyNames(id)
      if (geographyNamesResponse.success) {
        areaNameOptions.push(...geographyNamesResponse.data.geographies.map(({ name }) => name))
      }
    }
  }

  return (
    <AreaSelectorForm
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
