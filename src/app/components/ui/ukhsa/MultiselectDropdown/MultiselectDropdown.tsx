'use client'

import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

interface MultiselectDropdownProps {
  name: string
}

export function MultiselectDropdown({ name }: MultiselectDropdownProps) {
  const [open, setOpen] = useState(false)
  const checkboxRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([])

  // TODO: Get options from CMS
  const [options] = useState<Array<string>>(['test1', 'test2', 'test3'])
  const [selectedOptions] = useState<Array<string>>(['test2'])

  useEffect(() => {
    checkboxRefs.current = options.map((_, index) => checkboxRefs.current[index] || React.createRef())
  }, [options])

  function toggleDropdown() {
    setOpen((open) => !open)
  }

  const handleKeyDown = ({ event, source, index }: { event: React.KeyboardEvent; source: string; index: number }) => {
    console.log('Keydown')
    console.log(`Event: ${event}, Source: ${source}, index: ${index}, Key: ${event.key}`)

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

      case 'input':
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault()
          const checkbox = event.target as HTMLInputElement
          checkbox.checked = !checkbox.checked
          handleOptionSelect(index) // your function to update selected state
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          const total = options.length
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

  function handleOptionSelect(index: number) {
    console.log('Index:', index)
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
          'ukhsa-dropdown govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 govuk-!-margin-bottom-2 relative w-full border-[1px] border-black bg-white text-left text-black no-underline ukhsa-focus before:border-black',
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
          'absolute z-[1] flex h-[134px] w-[300px] flex-col border-[1px] border-grey-4 bg-white shadow-md',
          {
            block: open,
            hidden: !open,
          }
        )}
      >
        {options.map((option, index) => (
          <div
            key={index}
            role="option"
            aria-selected={selectedOptions.includes(option)}
            tabIndex={-1}
            onClick={() => handleOptionSelect(index)}
            onKeyDown={(event) => handleKeyDown({ event, source: 'option', index: 0 })}
            className={'govuk-checkboxes govuk-checkboxes--small relative flex'}
          >
            <input
              className="govuk-checkboxes__input"
              tabIndex={-1}
              name={option}
              id={`ukhsa-checkbox-${option}`}
              type="checkbox"
              value={option}
              ref={checkboxRefs.current[index]}
              onKeyDown={(event) => handleKeyDown({ event, source: 'input', index })}
            />
            <label className="govuk-label govuk-checkboxes__label" htmlFor={`ukhsa-checkbox-${option}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
