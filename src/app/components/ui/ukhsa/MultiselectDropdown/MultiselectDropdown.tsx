'use client'

import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

import { useSelectedFilters } from '@/app/hooks/globalFilterHooks'

type FlatOption = { id: string; name: string }
type GroupedOption = { title: string; children: string[] }
type Options = FlatOption[] | GroupedOption[]

interface MultiselectDropdownProps {
  name: string
  nestedMultiselect?: boolean
  selectionLimit?: number
  data?: any
}

export function MultiselectDropdown({
  name,
  nestedMultiselect = false,
  selectionLimit = 4,
  data = [],
}: MultiselectDropdownProps) {
  const [open, setOpen] = useState(false)
  const checkboxRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([])
  const { selectedFilters, addFilter, removeFilter, updateFilters } = useSelectedFilters()

  let options = []
  if (data) {
    options = data.map((item: any) => {
      return { id: `${name}.${item.geography_code}`, label: item.name }
    })
  }

  //TODO: I have left this in for reference. will need to be tidied up once functionality is complete.
  // const [options] = useState<Options>(
  //   nestedMultiselect
  //     ? [
  //         { title: 'Group 1', children: ['child1', 'child2', 'child3'] },
  //         { title: 'Group 2', children: ['child4', 'child5'] },
  //       ]
  //     : ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10']
  // )

  const createFilterOption = (optionValue: FlatOption) => ({
    id: optionValue.id,
    label: optionValue.label,
  })

  const isFilterSelected = (optionValue: FlatOption) => {
    const filterId = optionValue.id
    const isSelected = selectedFilters!.some((filter) => filter.id === filterId)
    return isSelected
  }

  const isOptionDisabled = (optionValue: string) => {
    if (nestedMultiselect) return false
    if (isFilterSelected(optionValue)) return false

    const currentSelectionCount = selectedFilters!.filter((filter) => filter.id.startsWith(`${name}.`)).length

    // Disable if we've reached the limit
    return currentSelectionCount >= selectionLimit
  }

  const flatFocusableList = React.useMemo(() => {
    if (!nestedMultiselect)
      return (options as FlatOption[]).map((option, i) => ({
        type: 'option',
        groupIndex: undefined,
        childIndex: undefined,
        flatIndex: i,
      }))

    const list: Array<{
      type: 'group' | 'child'
      groupIndex: number | undefined
      childIndex: number | undefined
      flatIndex: number
    }> = []
    let flatIndex = 0

    ;(options as GroupedOption[]).forEach((group, groupIndex) => {
      list.push({ type: 'group', groupIndex, childIndex: undefined, flatIndex: flatIndex++ })
      group.children.forEach((_, childIndex) => {
        list.push({ type: 'child', groupIndex, childIndex, flatIndex: flatIndex++ })
      })
    })
    return list
  }, [options, nestedMultiselect])

  useEffect(() => {
    checkboxRefs.current = Array(flatFocusableList.length)
      .fill(null)
      .map((_, index) => checkboxRefs.current[index] || React.createRef())
  }, [flatFocusableList])

  useEffect(() => {
    if (open && checkboxRefs.current[0]?.current) {
      checkboxRefs.current[0].current.focus()
    }
  }, [open])

  function toggleDropdown() {
    setOpen((open) => !open)
  }

  const handleKeyDown = ({ event, source, index }: { event: React.KeyboardEvent; source: string; index: number }) => {
    switch (source) {
      case 'button':
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault() // Prevent default action (like scrolling)
          toggleDropdown()
        } else if (event.key === 'ArrowDown') {
          event.preventDefault()
          // Open the menu if down pressed and it's closed
          if (!open) setOpen(true)

          // Move down the list on down pressed (and open)
          if (checkboxRefs.current[0]?.current) {
            checkboxRefs.current[0].current.focus()
          }
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          if (open && checkboxRefs.current.length > 0) {
            const lastRef = checkboxRefs.current[checkboxRefs.current.length - 1]?.current ?? null
            if (lastRef) lastRef.focus()
          }
        }
        break

      case 'option':
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault()
          const currentItem = flatFocusableList[index]
          if (currentItem.type === 'group') {
            if (typeof currentItem.groupIndex === 'number') {
              handleGroupSelect(currentItem.groupIndex)
            }
          } else if (currentItem.type === 'child') {
            if (typeof currentItem.groupIndex === 'number' && typeof currentItem.childIndex === 'number') {
              handleOptionSelect(currentItem.groupIndex, currentItem.childIndex)
            }
          } else {
            // Check if disabled before handling
            if (!nestedMultiselect) {
              const option = (options as FlatOption[])[index]
              if (isOptionDisabled(option)) return
            }
            handleOptionSelect(index)
          }
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          const total = flatFocusableList.length
          let newIndex
          if (event.key === 'ArrowDown') {
            newIndex = (index + 1) % total
          } else {
            newIndex = (index - 1 + total) % total
          }
          const nextRef = checkboxRefs.current[newIndex]?.current ?? null
          if (nextRef) {
            nextRef.focus()
          }
        }
        break

      default:
        break
    }
  }

  function handleOptionSelect(groupIndexOrIndex: number, childIndex?: number) {
    if (nestedMultiselect) {
      const group = (options as GroupedOption[])[groupIndexOrIndex]
      if (!group || childIndex === undefined) return
      const selectedChild = group.children[childIndex]
      const filterOption = createFilterOption(selectedChild)

      if (isFilterSelected(selectedChild)) {
        removeFilter(filterOption.id)
      } else {
        addFilter(filterOption)
      }
    } else {
      const filterOption = (options as FlatOption[])[groupIndexOrIndex]
      if (isOptionDisabled(filterOption)) return

      if (isFilterSelected(filterOption)) {
        removeFilter(filterOption.id)
      } else {
        addFilter(filterOption)
      }
    }
  }

  function handleGroupSelect(groupIndex: number) {
    const group = (options as GroupedOption[])[groupIndex]
    const allSelected = group.children.every((child) => isFilterSelected(child))

    if (allSelected) {
      // Deselect all children in this group
      const updatedFilters = selectedFilters!.filter((filter) => {
        const groupChildIds = group.children.map((child) => `${name}.${child}`)
        return !groupChildIds.includes(filter.id)
      })
      updateFilters(updatedFilters)
    } else {
      // Select all children in this group (including those already selected)
      const groupFilters = group.children.map((child) => createFilterOption(child))
      const nonGroupFilters = selectedFilters!.filter((filter) => {
        const groupChildIds = group.children.map((child) => `${name}.${child}`)
        return !groupChildIds.includes(filter.id)
      })
      const updatedFilters = [...nonGroupFilters, ...groupFilters]
      updateFilters(updatedFilters)
    }
  }

  return (
    <div className="relative">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleDropdown}
        onKeyDown={(event) => handleKeyDown({ event, source: 'button', index: 0 })}
        // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value, tailwindcss/no-custom-classname
        className={clsx(
          'ukhsa-dropdown govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-bottom-1 relative w-full border-[1px] border-black bg-white text-left text-black no-underline ukhsa-focus before:border-black',
          { open: open }
        )}
      >
        {name}
      </button>
      <div
        role="listbox"
        tabIndex={-1}
        // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
        className={clsx(
          'absolute z-[10000] flex max-h-[214px] w-[300px] flex-col overflow-y-auto border-[1px] border-grey-4 bg-white p-2 shadow-md',
          {
            block: open,
            hidden: !open,
          }
        )}
      >
        <div className="pb-0 text-grey-2">Select one or more</div>

        {nestedMultiselect
          ? // Nested multiselect rendering
            (options as GroupedOption[]).map((group: GroupedOption, groupIndex: number) => {
              // Find flat index for group
              const groupFlatIndex =
                flatFocusableList.find((item) => item.type === 'group' && item.groupIndex === groupIndex)?.flatIndex ??
                0
              return (
                <div key={groupIndex}>
                  <div
                    className={clsx('govuk-checkboxes govuk-checkboxes--small flex items-center px-0 font-bold')}
                    role="option"
                    aria-selected={group.children.every((child) => isFilterSelected(child))}
                  >
                    <input
                      className="govuk-checkboxes__input py-0 pl-4"
                      name={group.title}
                      id={`ukhsa-checkbox-group-${groupIndex}`}
                      type="checkbox"
                      checked={group.children.every((child) => isFilterSelected(child))}
                      tabIndex={-1}
                      ref={checkboxRefs.current[groupFlatIndex]}
                      onChange={() => {
                        if (typeof groupIndex === 'number') handleGroupSelect(groupIndex)
                      }}
                      onKeyDown={(event) => handleKeyDown({ event, source: 'option', index: groupFlatIndex })}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label relative py-0 before:left-[-32px] before:top-0 after:left-[-26px] after:top-[8px]"
                      htmlFor={`ukhsa-checkbox-group-${groupIndex}`}
                    >
                      {group.title}
                    </label>
                  </div>
                  {group.children.map((child: string, childIndex: number) => {
                    const childFlatIndex =
                      flatFocusableList.find(
                        (item) =>
                          item.type === 'child' && item.groupIndex === groupIndex && item.childIndex === childIndex
                      )?.flatIndex ?? 0
                    return (
                      <div
                        key={childIndex}
                        role="option"
                        aria-selected={isFilterSelected(child)}
                        className={'govuk-checkboxes govuk-checkboxes--small relative flex px-0 pl-4'}
                      >
                        <input
                          className="govuk-checkboxes__input py-0 pl-4"
                          tabIndex={-1}
                          name={child}
                          id={`ukhsa-checkbox-child-${groupIndex}-${childIndex}`}
                          type="checkbox"
                          value={child}
                          ref={checkboxRefs.current[childFlatIndex]}
                          checked={isFilterSelected(child)}
                          onChange={() => {
                            if (typeof groupIndex === 'number' && typeof childIndex === 'number')
                              handleOptionSelect(groupIndex, childIndex)
                          }}
                          onKeyDown={(event) => handleKeyDown({ event, source: 'option', index: childFlatIndex })}
                        />
                        <label
                          className="govuk-label govuk-checkboxes__label relative py-0 before:left-[-32px] before:top-0 after:left-[-26px] after:top-[8px]"
                          htmlFor={`ukhsa-checkbox-child-${groupIndex}-${childIndex}`}
                        >
                          {child}
                        </label>
                      </div>
                    )
                  })}
                </div>
              )
            })
          : // Render single depth of options
            (options as FlatOption[]).map((option: FlatOption, index: number) => {
              const isDisabled = isOptionDisabled(option)
              return (
                <div
                  key={index}
                  role="option"
                  aria-selected={isFilterSelected(option)}
                  className={'govuk-checkboxes govuk-checkboxes--small relative flex px-0'}
                >
                  <input
                    className="govuk-checkboxes__input py-0 pl-4"
                    tabIndex={-1}
                    name={option.label}
                    id={`ukhsa-checkbox-${option.label}`}
                    type="checkbox"
                    value={option}
                    ref={checkboxRefs.current[index]}
                    checked={isFilterSelected(option)}
                    disabled={isDisabled}
                    onChange={() => handleOptionSelect(index)}
                    onKeyDown={(event) => handleKeyDown({ event, source: 'option', index })}
                  />
                  <label
                    className={clsx('govuk-label govuk-checkboxes__label py-0', {
                      'govuk-checkboxes__label--disabled': isDisabled,
                    })}
                    htmlFor={`ukhsa-checkbox-${option}`}
                  >
                    {option.label}
                  </label>
                </div>
              )
            })}
      </div>
    </div>
  )
}
