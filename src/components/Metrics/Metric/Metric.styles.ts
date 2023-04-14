import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

export const Container = styled.div({
  '&:not(:first-of-type)': {
    marginTop: SPACING.SCALE_3,
  },
})
