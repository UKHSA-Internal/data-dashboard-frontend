import { Link } from 'govuk-react'
import styled from 'styled-components'
import { BODY_SIZES, SPACING } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { BLUE } from 'govuk-colours'

type ButtonProps = {
  $isVisible: boolean
}

export const Button = styled(Link)<ButtonProps>`
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  position: fixed;
  bottom: ${SPACING.SCALE_4};
  left: ${SPACING.SCALE_4};
  ${typography.font({ size: BODY_SIZES.SMALL })}
  padding: ${SPACING.SCALE_2} ${SPACING.SCALE_4};
  background-color: transparent;
  color: ${BLUE};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #003078;
    text-decoration: underline;

    & div {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%23003078' stroke-width='2' d='M6.864 14.364v-12m.207-.657L.707 8.071m6.5-5.778 6.364 6.364'/%3E%3Cpath stroke='%23003078' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E");
    }
  }
`

export const ArrowIcon = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%231D70B8' stroke-width='2' d='M6.864 14.364v-12m.207-.657L.707 8.071m6.5-5.778 6.364 6.364'/%3E%3Cpath stroke='%231D70B8' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  height: 16px;
  width: 16px;
  margin-right: 10px;
`
