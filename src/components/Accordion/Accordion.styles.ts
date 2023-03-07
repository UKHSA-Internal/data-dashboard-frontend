import { BODY_SIZES, FONT_WEIGHTS } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'

import * as ReactAccordion from 'react-accessible-accordion'
import styled from 'styled-components'

export const Accordion = styled(ReactAccordion.Accordion)``

export const AccordionItem = styled(ReactAccordion.AccordionItem)`
  padding-top: 15px;

  .js-enabled & {
    padding-top: 0;
  }
`

export const AccordionItemButton = styled(ReactAccordion.AccordionItemButton)`
  padding-top: 15px;
  outline: none;

  .js-enabled & {
    width: 100%;
    padding: 10px 0 0 0;
    border: 0;
    border-top: 1px solid #b1b4b6;
    border-bottom: 10px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background: none;
    text-align: left;
    cursor: pointer;
    -webkit-appearance: none;

    ${typography.font({ size: BODY_SIZES.LARGE })}
    font-weight: ${FONT_WEIGHTS.bold};

    @media (min-width: 40.0625em) {
      padding-bottom: 10px;
    }

    &:hover {
      color: #0b0c0c;
      background: #f3f2f1;
    }
  }
`

export const AccordionItemButtonFocus = styled.span`
  display: inline;

  [role='button']:focus & {
    padding-bottom: 3px;
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0, 0 4px #0b0c0c;
    text-decoration: none;
    box-decoration-break: clone;
  }
`

export const AccordionItemButtonText = styled.span`
  .js-enabled & {
    display: block;
    margin-bottom: 13px;
  }
`

export const AccordionItemHeading = styled(ReactAccordion.AccordionItemHeading)`
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  ${typography.font({ size: BODY_SIZES.LARGE })}
  font-weight: ${FONT_WEIGHTS.bold};

  .js-enabled & {
    padding: 0;
  }
`

export const AccordionItemPanel = styled(ReactAccordion.AccordionItemPanel)`
  display: block;
  ${typography.font({ size: BODY_SIZES.MEDIUM })}

  .js-enabled & {
    &[hidden] {
      display: none;
    }

    &[aria-hidden='false'] {
      padding-bottom: 50px;
    }
  }
`

export const AccordionItemToggle = styled.span<{ expanded: boolean }>`
  display: none;

  .js-enabled & {
    display: block;
    margin-bottom: 13px;
    ${typography.font({ size: BODY_SIZES.MEDIUM })}
    color: #1d70b8;
  }
`
export const AccordionItemToggleFocus = styled.span`
  display: inline;

  [role='button']:focus & {
    padding-bottom: 3px;
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0, 0 4px #0b0c0c;
    text-decoration: none;
    box-decoration-break: clone;
  }
`

export const AccordionItemToggleChevron = styled.span`
  div[aria-expanded='false'] & {
    transform: rotate(180deg);
  }

  [role='button']:hover &,
  [role='button']:focus & {
    color: #0b0c0c;
    background: #0b0c0c;

    &:after {
      color: #f3f2f1;
    }
  }

  .js-enabled & {
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
    border: 0.0625rem solid;
    border-radius: 50%;
    vertical-align: middle;

    &:after {
      content: '';
      box-sizing: border-box;
      display: block;
      position: absolute;
      bottom: 0.3125rem;
      left: 0.375rem;
      width: 0.375rem;
      height: 0.375rem;
      transform: rotate(-45deg);
      border-top: 0.125rem solid;
      border-right: 0.125rem solid;
    }
  }
`
export const AccordionItemToggleText = styled.span`
  [role='button']:hover &,
  [role='button']:focus & {
    color: #0b0c0c;
  }

  .js-enabled & {
    ${typography.font({ size: BODY_SIZES.MEDIUM })}
    margin-left: 5px;
    vertical-align: middle;
  }
`
