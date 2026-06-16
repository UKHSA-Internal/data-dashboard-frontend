'use client'

import { useCallback, useEffect, useState } from 'react'

import {
  ExpandableFilterDropdown,
  type ExpandableFilterItem,
  type SelectedFilterItem,
} from '@/app/components/cms/ExpandableFilterDropdown/ExpandableFilterDropdown'

function getVisibleCardIDs(items: ExpandableFilterItem[], selectedFilterItems: SelectedFilterItem[]) {
  const visible = new Set<string>()

  for (const selectedFilterItem of selectedFilterItems) {
    const parent = items.find((i) => i.id === selectedFilterItem.id)

    if (parent?.children) {
      parent.children.forEach((child) => visible.add(child.id))
      continue
    }

    if (!parent) {
      visible.add(selectedFilterItem.id)
    }
  }

  return visible
}

interface TopicsListFilterContainerProps {
  readonly items: ExpandableFilterItem[]
}

export function TopicsListFilterContainer({ items }: TopicsListFilterContainerProps) {
  const [selected, setSelected] = useState<SelectedFilterItem[]>([])

  const handleSelectionChange = useCallback((nextSelected: SelectedFilterItem[]) => {
    setSelected(nextSelected)
  }, [])

  useEffect(() => {
    const visibleCardIDs = getVisibleCardIDs(items, selected)

    const topicFilterItems = document.querySelectorAll<HTMLElement>('[data-topic-filter-id]')
    for (const topicFilterItem of topicFilterItems) {
      const topicFilterId = topicFilterItem.dataset.topicFilterId
      if (!topicFilterId) continue

      // If visible filters contains topic, or no filters selected then show card
      topicFilterItem.style.display = visibleCardIDs.size === 0 || visibleCardIDs.has(topicFilterId) ? '' : 'none'
    }

    // Hide section headers if none of its topic cards are visible
    const healthTopicsSections = document.querySelectorAll<HTMLElement>('[data-topics-list-section-key]')
    for (const section of healthTopicsSections) {
      const topicCards = section.querySelectorAll<HTMLElement>('[data-topic-filter-id]')
      if (topicCards.length === 0) {
        section.style.display = ''
        continue
      }
      if (visibleCardIDs.size === 0) {
        section.style.display = ''
        continue
      }
      const anyCardVisible = Array.from(topicCards).some((card) => card.style.display !== 'none')
      section.style.display = anyCardVisible ? '' : 'none'
    }
  }, [items, selected])

  return <ExpandableFilterDropdown items={items} onSelectionChange={handleSelectionChange} />
}
