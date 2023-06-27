import { BODY_SIZES, FONT_WEIGHTS } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { Table as GovukTable } from 'govuk-react'
import styled from 'styled-components'

export const Table = styled(GovukTable)`
  && {
    table-layout: fixed;

    caption {
      ${typography.font({ size: BODY_SIZES.LARGE })}
      font-weight: ${FONT_WEIGHTS.bold};
      margin-bottom: 15px;
      display: block;
    }
  }
`
