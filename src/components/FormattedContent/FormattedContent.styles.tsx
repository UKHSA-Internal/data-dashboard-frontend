import { SPACING, BODY_SIZES } from '@govuk-react/constants'
import ReactMarkdown from 'react-markdown'
import styled, { css } from 'styled-components'
import { typography } from '@govuk-react/lib'

export const Container = styled(ReactMarkdown)<{ hasLinkedHeadings: boolean }>`
  && {
    ${(props) =>
      props.hasLinkedHeadings &&
      css`
        a:has(h2) {
          margin-top: ${SPACING.SCALE_5};
          margin-bottom: ${SPACING.SCALE_4};
        }
      `}

    ${(props) =>
      !props.hasLinkedHeadings &&
      css`
        h2 {
          margin-top: ${SPACING.SCALE_5};
        }

        h3 {
          margin-top: ${SPACING.SCALE_4};
        }
      `}

    p {
      margin: 0;
      margin-bottom: ${SPACING.SCALE_4};
      ${typography.font({ size: BODY_SIZES.MEDIUM })}
    }
  }
`
