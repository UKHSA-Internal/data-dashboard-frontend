'use client'

import { useCallback, useEffect, useState } from 'react'

import {
  ExpandableFilterDropdown,
  type ExpandableFilterItem,
  type SelectedFilterItem,
} from '@/app/components/cms/ExpandableFilterDropdown/ExpandableFilterDropdown'

type TopicsListFilterControllerProps = {
  items: ExpandableFilterItem[]
}

function getVisibleCardIDs(items: ExpandableFilterItem[], selectedFilterItems: SelectedFilterItem[]) {
  const visible = new Set<string>()

  for (const selectedFilterItem of selectedFilterItems) {
    const parent = items.find((i) => i.id === selectedFilterItem.id)
    if (parent && parent.children) {
      parent.children.forEach((child) => visible.add(child.id))
      continue
    }

    if (!parent) {
      visible.add(selectedFilterItem.id)
    }
  }

  return visible
}

export function TopicsListFilterController({ items }: TopicsListFilterControllerProps) {
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

    const url = new URL(window.location.href)
    if (visibleCardIDs.size === 0) {
      url.searchParams.delete('topicFilters')
    } else {
      url.searchParams.set('topicFilters', Array.from(visibleCardIDs).join(','))
    }
    window.history.replaceState({}, '', url.toString())
  }, [items, selected])

  return <ExpandableFilterDropdown items={items} onSelectionChange={handleSelectionChange} />
}
