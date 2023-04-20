import styled from 'styled-components'
import { BREAKPOINTS } from '@govuk-react/constants'
import { CardContainer } from '../Card/Card.styles'

type ContainerProps = {
  $columnLimit: number
}

export const LimitContainer = styled(CardContainer)`
  padding: 0;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.DESKTOP}) and (min-width: 440px) {
    grid-template-columns: ${(props: ContainerProps) => `repeat(${props.$columnLimit}, 1fr)`};
  }
`
