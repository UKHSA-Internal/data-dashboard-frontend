import { H2 } from 'govuk-react'
import { Children, cloneElement, isValidElement, ReactNode, useMemo } from 'react'
import { Accordion as ReactAccordion, AccordionItemState } from 'react-accessible-accordion'

import * as Styled from './Accordion.styles'
import { AccordionProvider, useAccordion } from './AccordionContext'

/**
 * Gov.uk React component library does not yet support the GDS Accordion component
 *
 * This internal component is a wrapper around an open-source npm
 * package with style and functionality overrides matching the GDS component
 * https://design-system.service.gov.uk/components/accordion/
 */

interface AccordionProps {
  children: ReactNode
  containerProps?: Record<string, string>
}

export const Accordion = ({ children, containerProps }: AccordionProps) => (
  <AccordionProvider>
    <ReactAccordion allowMultipleExpanded allowZeroExpanded {...containerProps}>
      <AccordionItems>{children}</AccordionItems>
    </ReactAccordion>
  </AccordionProvider>
)

/**
 * AccordionItems
 * Custom wrapper that adds a controlled uuid per panel. This allows the panels to
 * communicate with the context provider with their id when interacted with
 */
interface AccordionItemsProps {
  children: ReactNode
}

const AccordionItems = ({ children }: AccordionItemsProps) => {
  const items = useMemo(() => {
    return Array(Children.count(children))
      .fill(null)
      .map((_, idx) => `panel-${idx}`)
  }, [children])

  return (
    <>
      <AccordionExpander allItems={items} />

      {Children.map(children, (child, idx) => {
        return isValidElement(child) ? cloneElement(child, { ...child.props, uuid: `panel-${idx}` }) : null
      })}
    </>
  )
}

/**
 * AccordionExpander
 * The global expander that sits above the accordion for toggling all panels expanded/collapsed
 */
interface AccordionExpanderProps {
  allItems: string[]
  hideLabel?: string
  showLabel?: string
}

const AccordionExpander = ({ allItems, hideLabel = 'Hide', showLabel = 'Show' }: AccordionExpanderProps) => {
  const { expanded, setExpanded } = useAccordion()

  const allShown = allItems.length === expanded.size

  const handleClick = () => {
    const items = allShown ? new Set([]) : new Set(allItems)
    setExpanded(items)
  }

  const label = `${allShown ? hideLabel : showLabel} all sections`

  return (
    <Styled.AccordionItemExpander aria-label={label} role="button" onClick={handleClick} aria-expanded={allShown}>
      <Styled.AccordionItemToggle>
        <Styled.AccordionItemToggleFocus>
          <Styled.AccordionItemToggleChevron />
          <Styled.AccordionItemToggleText>{label}</Styled.AccordionItemToggleText>
        </Styled.AccordionItemToggleFocus>
      </Styled.AccordionItemToggle>
    </Styled.AccordionItemExpander>
  )
}

/**
 * AccordionItemButton
 * Handles the govuk focus state requirements and toggles the show/hide text per accordion item
 */
interface AccordionItemButtonProps {
  children: ReactNode
}

export const AccordionItemButton = ({ children }: AccordionItemButtonProps) => (
  <AccordionItemState>
    {({ expanded }) => (
      <Styled.AccordionItemButton as={'button'} aria-expanded={expanded}>
        <Styled.AccordionItemButtonText>
          <Styled.AccordionItemButtonFocus>{children}</Styled.AccordionItemButtonFocus>
        </Styled.AccordionItemButtonText>
        <Styled.AccordionItemToggle>
          <Styled.AccordionItemToggleFocus>
            <Styled.AccordionItemToggleChevron />
            <Styled.AccordionItemToggleText>{expanded ? 'Hide' : 'Show'}</Styled.AccordionItemToggleText>
          </Styled.AccordionItemToggleFocus>
        </Styled.AccordionItemToggle>
      </Styled.AccordionItemButton>
    )}
  </AccordionItemState>
)

/**
 * AccordionItemHeading
 * Wrapper around the package component that forces the style to govuk heading
 */
interface AccordionItemHeadingProps {
  children: ReactNode
}

export const AccordionItemHeading = ({ children }: AccordionItemHeadingProps) => (
  <Styled.AccordionItemHeading as={H2}>{children}</Styled.AccordionItemHeading>
)

/**
 * AccordionItem
 * Handles the toggling of the controlled state within the context provider
 * when the user clicks on individual accordion items
 */
interface AccordionItemProps {
  children: ReactNode
  uuid?: string
}

export const AccordionItem = ({ uuid = '', children }: AccordionItemProps) => {
  const { expanded, setExpanded } = useAccordion()

  const isActive = expanded.has(uuid)

  const handleClick = () => {
    if (expanded.has(uuid)) {
      expanded.delete(uuid)
    } else {
      expanded.add(uuid)
    }
    setExpanded(new Set(expanded))
  }

  return (
    <Styled.AccordionItem uuid={uuid} dangerouslySetExpanded={isActive} onClick={handleClick}>
      {children}
    </Styled.AccordionItem>
  )
}

export const AccordionItemPanel = Styled.AccordionItemPanel
