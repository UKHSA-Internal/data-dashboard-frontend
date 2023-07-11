import { SPACING } from '@govuk-react/constants'
import { Paragraph } from 'govuk-react'
import styled from 'styled-components'

import { chartDownloadButtonWidth } from '@/styles/Theme'

interface SecondaryTextProps {
  fullWidth: boolean
}

export const SecondaryText = styled(Paragraph)<SecondaryTextProps>`
  margin-top: ${SPACING.SCALE_2};
  font-size: 24px;
  min-height: 63px;
  /* max-width: ${(props) => (props.fullWidth ? '100%' : `calc(100% - ${chartDownloadButtonWidth})`)}; */

  > p {
    font-size: 24px;
    font-weight: bold;
  }
`
