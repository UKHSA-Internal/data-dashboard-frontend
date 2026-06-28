import { Topics } from '@/api/models'
import { getGeographies } from '@/api/requests/geographies/getGeographies'
import { logger } from '@/lib/logger'

import { AreaSelectorForm } from './AreaSelectorForm'

interface AreaSelectorProps {
  areaType: string | undefined
  selectedTopics: Topics[]
  isPublic?: boolean
}

export async function AreaSelector({ areaType, selectedTopics, isPublic }: AreaSelectorProps) {
  const geographiesResponse = await getGeographies({ topic: selectedTopics[0] }, isPublic)

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

  return <AreaSelectorForm areaType={areaType} areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} />
}
