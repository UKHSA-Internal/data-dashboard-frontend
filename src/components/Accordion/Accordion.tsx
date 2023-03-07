import { H2 } from 'govuk-react'
import { AccordionItemState } from 'react-accessible-accordion'
import * as Styled from './Accordion.styles'

/**
 * Gov.uk React component library does not yet support the GDS Accordion component
 *
 * This internal component is a wrapper around an open-source npm
 * package with style and functionality overrides matching the GDS component
 * https://design-system.service.gov.uk/components/accordion/
 */

type AccordionProps = { children: React.ReactNode }
type AccordionItemHeadingProps = { children: React.ReactNode }
type AccordionItemButtonProps = { children: React.ReactNode }

export const Accordion = ({ children }: AccordionProps) => (
  <Styled.Accordion allowMultipleExpanded allowZeroExpanded>
    {children}
  </Styled.Accordion>
)

export const AccordionItemButton = ({ children }: AccordionItemButtonProps) => (
  <AccordionItemState>
    {({ expanded }) => (
      <Styled.AccordionItemButton>
        <Styled.AccordionItemButtonText>
          <Styled.AccordionItemButtonFocus>
            {children}
          </Styled.AccordionItemButtonFocus>
        </Styled.AccordionItemButtonText>
        <Styled.AccordionItemToggle expanded={!!expanded}>
          <Styled.AccordionItemToggleFocus>
            <Styled.AccordionItemToggleChevron />
            <Styled.AccordionItemToggleText>
              {expanded ? 'Hide' : 'Show'}
            </Styled.AccordionItemToggleText>
          </Styled.AccordionItemToggleFocus>
        </Styled.AccordionItemToggle>
      </Styled.AccordionItemButton>
    )}
  </AccordionItemState>
)

export const AccordionItemHeading = ({
  children,
}: AccordionItemHeadingProps) => (
  <Styled.AccordionItemHeading as={H2}>{children}</Styled.AccordionItemHeading>
)

export const AccordionItem = Styled.AccordionItem
export const AccordionItemPanel = Styled.AccordionItemPanel
