import { useTranslation } from '@/app/i18n'

import { AreaSelectorForm } from './AreaSelectorForm'

// TODO: This RSC will fetch the area types and area names on page load if available in the URL
// The child client component will be responsible for re-fetching on demand for JS users

// NOTE: These are temporary until an API is in place for this server component to consume
const mockAreaTypes = [
  'Nation',
  'UKHSA Region',
  'Upper Tier Local Authority',
  'Lower Tier Local Authority',
  'NHS Region',
  'NHS Trust',
  'Government Office Region',
]

// NOTE: These are temporary until an API is in place for this server component to consume
const mockAreaNames = ['England', 'Lincolnshire', 'Allerdale', 'Suffolk', 'Southampton']

export async function AreaSelector() {
  const { t } = await useTranslation('common')

  return (
    <AreaSelectorForm
      areaTypeOptions={mockAreaTypes}
      areaNameOptions={mockAreaNames}
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
