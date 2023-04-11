import styled from 'styled-components'
import { Link as GovUKLink, Button } from 'govuk-react'
import { BLACK } from 'govuk-colours'
import { typography } from '@govuk-react/lib'
import { BODY_SIZES, SPACING, MEDIA_QUERIES } from '@govuk-react/constants'

export const Link = styled(GovUKLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  height: 29;
  ${typography.font({ size: BODY_SIZES.SMALL })}

  ${MEDIA_QUERIES.TABLET} {
    width: 122;
  }

  &:link,
  &:visited,
  &:hover {
    color: BLACK;
  }
`

export const TextWrapper = styled.span`
  background: url("data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%230B0C0C' d='M7 0h2v11H7zM0 16v-2h16v2z'/%3E%3Cpath fill='%230B0C0C' d='M8.414 12.11 7 10.698 11.696 6l1.414 1.414z'/%3E%3Cpath fill='%230B0C0C' d='M9 11H7V1h2z'/%3E%3Cpath fill='%230B0C0C' d='M3 7.414 4.414 6l4.696 4.696-1.414 1.414z'/%3E%3Cpath fill='%230B0C0C' d='M7.168 11.574 7.742 11l.889.889-.574.574z'/%3E%3C/svg%3E")
    left center no-repeat;
  padding-left: ${SPACING.SCALE_4};
`
