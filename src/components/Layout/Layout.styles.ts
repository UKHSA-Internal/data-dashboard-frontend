import { Link } from 'govuk-react'
import { FONT_WEIGHTS } from '@govuk-react/constants'
import styled from 'styled-components'

export const TopNavLink = styled(Link)({
  color: '#ffffff',
  fontWeight: FONT_WEIGHTS.bold,
  textDecoration: 'none',
  marginTop: 3,
  display: 'inline-block',
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:hover, &:visited': {
    color: '#ffffff',
  },
})
