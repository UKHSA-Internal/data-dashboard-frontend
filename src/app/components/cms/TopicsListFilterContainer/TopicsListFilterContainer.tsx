'use client'

import snakeCase from 'lodash/snakeCase'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  ExpandableFilterDropdown,
  type ExpandableFilterItem,
  type SelectedFilterItem,
} from '@/app/components/cms/ExpandableFilterDropdown/ExpandableFilterDropdown'

// Ensures URL params are human readable rather than ID's
function getItemLabelByIDMap(items: ExpandableFilterItem[]) {
  const labelById = new Map<string, string>()

  for (const item of items) {
    labelById.set(item.id, item.label)
    item.children?.forEach((child) => labelById.set(child.id, child.label))
  }

  return labelById
}

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
  const labelById = useMemo(() => getItemLabelByIDMap(items), [items])

  const handleSelectionChange = useCallback((nextSelected: SelectedFilterItem[]) => {
    setSelected(nextSelected)
  }, [])

  useEffect(() => {
    const visibleCardIDs = getVisibleCardIDs(items, selected)
    const visibleCardLabelsSnakeCase = Array.from(visibleCardIDs).map((id) => {
      const label = labelById.get(id)
      return label ? snakeCase(label) : id
    })

    const topicFilterItems = document.querySelectorAll<HTMLElement>('[data-topic-filter-id]')
    for (const topicFilterItem of topicFilterItems) {
      const topicFilterId = topicFilterItem.dataset.topicFilterId
      if (!topicFilterId) continue

      // If visible filters contains topic, or no filters selected then show card
      topicFilterItem.style.display = visibleCardIDs.size === 0 || visibleCardIDs.has(topicFilterId) ? '' : 'none'
    }

    const url = new URL(globalThis.location.href)
    if (visibleCardIDs.size === 0) {
      url.searchParams.delete('topicFilters')
    } else {
      url.searchParams.set('topicFilters', visibleCardLabelsSnakeCase.join(','))
    }
    globalThis.history.replaceState({}, '', url.toString())
  }, [items, selected, labelById])

  return <ExpandableFilterDropdown items={items} onSelectionChange={handleSelectionChange} />
}
