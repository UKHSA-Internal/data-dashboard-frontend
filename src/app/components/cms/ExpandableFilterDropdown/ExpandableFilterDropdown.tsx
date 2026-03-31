'use client'

import clsx from 'clsx'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import CrossIcon from '@/app/components/ui/ukhsa/Icons/CrossIcon'
import { useTranslation } from '@/app/i18n/client'

export type FilterOptionChild = { id: string; label: string }

export type ExpandableFilterItem = {
  id: string
  label: string
  children?: FilterOptionChild[]
}

export type SelectedFilterItem = { id: string; label: string }

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <span className="ml-2 inline-block shrink-0 transition-transform duration-200" aria-hidden>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        className={clsx('inline-block', open && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M2 3.5L5 6.5L8 3.5" />
      </svg>
    </span>
  )
}

// Presentation component, or container component?

interface DropdownButtonProps {
  open: boolean
  label: string
  onClick: () => void
}

function DropdownButton({ open, onClick, label }: DropdownButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-haspopup="listbox"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className={clsx(
        'govuk-!-margin-bottom-1 govuk-!-margin-right-2 govuk-!-padding-1 govuk-!-padding-left-2 govuk-!-padding-right-2 relative flex w-full max-w-[400px] items-center justify-between border border-black bg-white text-left text-black no-underline ukhsa-focus',
        open && 'border-blue'
      )}
    >
      <span>{label}</span>
      <ChevronDownIcon open={open} />
    </button>
  )
}

function flattenFilterItems(items: ExpandableFilterItem[], selectedIds: Set<string>): SelectedFilterItem[] {
  const result: SelectedFilterItem[] = []

  for (const item of items) {
    const children = item.children

    // If no children, add the 'parent' (leaf?) item to the result if selected
    if (!children?.length) {
      if (selectedIds.has(item.id)) result.push({ id: item.id, label: item.label })
      continue
    }

    const selectedChildren = children.filter((c) => selectedIds.has(c.id))

    // If all children are selected, represent the selection with the parent.
    if (selectedChildren.length === children.length) {
      result.push({ id: item.id, label: item.label })
    } else {
      // Otherwise, show only the selected children.
      result.push(...selectedChildren.map((c) => ({ id: c.id, label: c.label })))
    }
  }
  return result
}

function getAllIds(item: ExpandableFilterItem): string[] {
  const ids = [item.id]
  if (item.children) {
    for (const c of item.children) ids.push(c.id)
  }
  return ids
}

interface DropdownContentProps {
  items: ExpandableFilterItem[]
  selectedIds: Set<string>
  expandedIds: Set<string>
  onToggleExpand: (id: string) => void
  onToggleParent: (item: ExpandableFilterItem) => void
  onToggleChild: (parentId: string, child: FilterOptionChild) => void
}

function DropdownContent({
  items,
  selectedIds,
  expandedIds,
  onToggleExpand,
  onToggleParent,
  onToggleChild,
}: DropdownContentProps) {
  return (
    <div
      role="listbox"
      tabIndex={-1}
      className="mt-0 max-h-[280px] w-full max-w-[650px] overflow-y-auto border border-grey-4 bg-white p-2 shadow-md"
    >
      {items.map((item) => {
        const isParent = item.children && item.children.length > 0
        const isExpanded = isParent && expandedIds.has(item.id)
        const allChildrenSelected = isParent && item.children?.every((c) => selectedIds.has(c.id))
        const parentChecked = selectedIds.has(item.id) || (isParent && allChildrenSelected)

        return (
          <div key={item.id}>
            <div className="flex items-center gap-1">
              {isParent ? (
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => onToggleExpand(item.id)}
                  className="relative shrink-0 p-1 ukhsa-focus"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    className={clsx('inline-block transition-transform', isExpanded && 'rotate-90')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M4 2L8 6L4 10" />
                  </svg>
                </button>
              ) : (
                <span className="mr-[2px] w-4" aria-hidden />
              )}
              <div className="govuk-checkboxes govuk-checkboxes--small flex flex-1 items-center px-0">
                <input
                  className="govuk-checkboxes__input py-0 pl-4"
                  name={item.id}
                  id={`filter-${item.id}`}
                  type="checkbox"
                  checked={parentChecked}
                  tabIndex={0}
                  onChange={() => (isParent ? onToggleParent(item) : onToggleParent(item))}
                />
                <label
                  className="govuk-label govuk-checkboxes__label relative flex-1 py-0 before:left-[-32px] before:top-0 after:left-[-26px] after:top-[8px]"
                  htmlFor={`filter-${item.id}`}
                >
                  {item.label}
                </label>
              </div>
            </div>
            {isParent && isExpanded && item.children && (
              <div className="ml-6 pl-2">
                {item.children.map((child) => (
                  <div key={child.id} className="govuk-checkboxes govuk-checkboxes--small relative flex px-0 pl-4">
                    <input
                      className="govuk-checkboxes__input py-0 pl-4"
                      tabIndex={0}
                      name={child.id}
                      id={`filter-child-${child.id}`}
                      type="checkbox"
                      checked={selectedIds.has(child.id)}
                      onChange={() => onToggleChild(item.id, child)}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label relative py-0 before:left-[-32px] before:top-0 after:left-[-26px] after:top-[8px]"
                      htmlFor={`filter-child-${child.id}`}
                    >
                      {child.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface SelectedItemsListProps {
  selected: SelectedFilterItem[]
  onRemove: (id: string) => void
  onClearAll: () => void
}

function SelectedItemsList({ selected, onRemove, onClearAll }: SelectedItemsListProps) {
  if (selected.length === 0) return null
  return (
    <div
      data-testid="expandable-filter-selected-list"
      className="govuk-!-padding-top-3 govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-bottom-3 relative mt-5 flex flex-wrap bg-grey-4"
    >
      <h2 className="govuk-heading-s govuk-!-margin-bottom-0 w-full">Selected filters ({selected.length})</h2>
      <button
        type="button"
        onClick={onClearAll}
        className="govuk-body-xs govuk-link govuk-!-margin-bottom-0 absolute right-3 top-[12px] text-blue underline"
      >
        Clear filter selection
        <span className="govuk-!-margin-left-2 inline-block">
          <CrossIcon colour="var(--colour-blue)" />
        </span>
      </button>
      <div data-testid="selected-filters-list" className="mt-2 flex w-full flex-wrap">
        {selected.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onRemove(filter.id)}
            // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
            className="govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-top-2 relative border-[1px] border-black bg-white text-black no-underline ukhsa-focus"
          >
            {filter.label}
            <span className="govuk-!-margin-left-2 inline-block">
              <CrossIcon />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export interface ExpandableFilterDropdownProps {
  items: ExpandableFilterItem[]
  onSelectionChange?: (selected: SelectedFilterItem[]) => void
}

export function ExpandableFilterDropdown({ items, onSelectionChange }: ExpandableFilterDropdownProps) {
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleParent = useCallback((item: ExpandableFilterItem) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      const ids = getAllIds(item)
      const allSelected = ids.every((id) => next.has(id))
      if (allSelected) {
        ids.forEach((id) => next.delete(id))
      } else {
        ids.forEach((id) => next.add(id))
      }
      return next
    })
  }, [])

  const toggleChild = useCallback((parentId: string, child: FilterOptionChild) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(child.id)) {
        next.delete(child.id)
        // When deselecting a child, also deselect the parent so the parent checkbox reflects partial selection
        next.delete(parentId)
      } else {
        next.add(child.id)
      }
      return next
    })
  }, [])

  const removeSelected = useCallback(
    (id: string) => {
      const parentItem = items.find((i) => i.id === id && i.children && i.children.length > 0)
      if (parentItem) {
        setSelectedIds((prev) => {
          const next = new Set(prev)
          next.delete(parentItem.id)
          parentItem.children?.forEach((c) => next.delete(c.id))
          return next
        })
      } else {
        setSelectedIds((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }
    },
    [items]
  )

  const clearAllSelected = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  const selectedList = useMemo(() => flattenFilterItems(items, selectedIds), [items, selectedIds])

  useEffect(() => {
    onSelectionChange?.(selectedList)
  }, [onSelectionChange, selectedList])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative">
        <DropdownButton open={open} onClick={() => setOpen((o) => !o)} label={t('cms.dropdown.filterButtonLabel')} />
        {open && (
          <div className="absolute left-0 top-full z-50 mt-1 w-[min(500px,calc(100vw-2rem))]">
            <DropdownContent
              items={items}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onToggleExpand={toggleExpand}
              onToggleParent={toggleParent}
              onToggleChild={toggleChild}
            />
          </div>
        )}
      </div>
      <SelectedItemsList selected={selectedList} onRemove={removeSelected} onClearAll={clearAllSelected} />
    </div>
  )
}
