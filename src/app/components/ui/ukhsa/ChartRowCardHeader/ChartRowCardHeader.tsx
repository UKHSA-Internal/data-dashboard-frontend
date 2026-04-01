import { ReactNode } from 'react'

import { getAreaSelector } from '@/app/hooks/getAreaSelector'

type Level = 'official' | 'official_sensitive' | 'protective_marking_not_set' | 'secret' | 'top_secret'

const levelContent: Record<Level, string> = {
  official: '(Official)',
  official_sensitive: '(Official Sensitive)',
  protective_marking_not_set: '(Protective marking not set)',
  secret: '(Secret)',
  top_secret: '(Top Secret)',
}

interface ChartRowCardHeaderProps {
  children?: ReactNode
  title: string
  description?: string
  id: string
  isPublic?: boolean
  pageClassification?: string
  authEnabled?: boolean
}

const getDataClassification = (
  isPublic: boolean | undefined,
  pageClassification: string,
  authEnabled: boolean | undefined
): string => {
  console.log('Auth enabled:', authEnabled, 'Is public:', isPublic, 'Page classification:', pageClassification)
  if (authEnabled && isPublic === false) {
    return pageClassification in levelContent ? levelContent[pageClassification as Level] : 'Official-Sensitive'
  }
  return ''
}

export async function ChartRowCardHeader({
  children,
  id,
  title,
  description,
  isPublic,
  pageClassification = 'official_sensitive',
  authEnabled,
}: Readonly<ChartRowCardHeaderProps>) {
  const [, areaName] = await getAreaSelector()

  return (
    <header>
      <h3 id={`chart-row-card-heading-${id}`} className="govuk-heading-m mb-2 font-bold">
        {title} {areaName && `(${areaName})`} {getDataClassification(isPublic, pageClassification, authEnabled)}
      </h3>
      {description ? (
        <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{description}</p>
      ) : null}
      {children}
    </header>
  )
}
