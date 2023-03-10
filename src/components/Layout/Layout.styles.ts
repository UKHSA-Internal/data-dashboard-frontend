import { Link } from 'govuk-react'
import { FONT_WEIGHTS } from '@govuk-react/constants'
import styled from 'styled-components'
import { COLOURS } from '@/styles/Theme'

export const TopNavLink = styled(Link)({
  color: COLOURS.WHITE,
  fontWeight: FONT_WEIGHTS.bold,
  textDecoration: 'none',
  marginTop: 3,
  display: 'inline-block',
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:hover, &:visited': {
    color: COLOURS.WHITE,
  },
})
