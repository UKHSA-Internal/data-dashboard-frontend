import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import styled from 'styled-components'

export const CMSContent = styled(ReactMarkdown)`
  && {
    h2 {
      margin-top: 30px;
    }

    h3 {
      margin-top: 20px;
    }

    p {
      margin: 0;
      margin-bottom: 20px;
      font-size: 19px;
      line-height: 21px;
    }
  }
`
