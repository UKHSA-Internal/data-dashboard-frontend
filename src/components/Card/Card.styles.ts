import styled from 'styled-components'
import { GREY_3, GREY_1 } from 'govuk-colours'
import { SPACING, BODY_SIZES, FONT_WEIGHTS, MEDIA_QUERIES } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { GridCol, GridRow, H3 } from 'govuk-react'

type ContainerProps = {
  theme: 'primary' | 'secondary'
}

export const Container = styled(GridRow)`
  width: '100%';
  margin: '0 auto';
  background-color: ${(p: ContainerProps) => (p.theme == 'primary' ? GREY_3 : 'transparent')};
  padding-top: ${SPACING.SCALE_3};
  padding-bottom: ${SPACING.SCALE_3};
  margin-top: ${SPACING.SCALE_5};
  ${typography.font({ size: BODY_SIZES.MEDIUM })};
`

export const CardColumnHeadingContainer = styled.div({
  [MEDIA_QUERIES.TABLET]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export const CardColumnHeading = styled(H3)({
  ...typography.font({ size: BODY_SIZES.MEDIUM }),
  fontWeight: FONT_WEIGHTS.regular,
  color: GREY_1,
  marginBottom: 0,
})

export const CardColumnGridCol = styled(GridCol)({
  '&:not(:last-child)': {
    marginBottom: SPACING.SCALE_4,
    [MEDIA_QUERIES.TABLET]: {
      marginBottom: 0,
    },
  },
})
