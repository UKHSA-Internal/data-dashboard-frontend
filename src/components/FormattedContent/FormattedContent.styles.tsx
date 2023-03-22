import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import styled from 'styled-components'
import { SPACING, LINE_HEIGHT, FONT_SIZE } from '@govuk-react/constants'

export const Container = styled(ReactMarkdown)`
  && {
    h2 {
      margin-top: ${SPACING.SCALE_5};
    }

    h3 {
      margin-top: ${SPACING.SCALE_4};
    }

    p {
      margin: 0;
      margin-bottom: ${SPACING.SCALE_4};
      font-size: ${FONT_SIZE.SIZE_19};
      line-height: ${LINE_HEIGHT.SIZE_19};
    }
  }
`
