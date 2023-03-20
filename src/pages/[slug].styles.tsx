import { H1, H2, Link, Paragraph } from 'govuk-react'
import styled from 'styled-components'

const Heading2 = styled(H2)``
const Par = styled(Paragraph)``

export const CMSContent = styled.div`
  && {
    p {
      ${Par}
    }

    h2 {
      ${Heading2}
    }

    /* 
    h2 {
      margin-bottom: 30px;
      font-size: 36px;
      line-height: 1.1112;
      font-weight: 700;
      display: block;
      margin-top: 0;
    } */

    h3 {
      margin-bottom: 20px;
      font-size: 24px;
      line-height: 1.25;
      font-weight: 700;
      display: block;
      margin-top: 0;
    }

    p {
      margin: 0;
    }

    a {
      ${Link}
    }
    /* 
    a:hover,
    a:active {
      color: #2b8cc4;
    } */

    ul {
      margin-bottom: 20px;
      font-size: 19px;
      line-height: 1.3157;
      font-weight: 400;
      margin-top: 0;
      padding-left: 20px;

      li {
        margin-bottom: 5px;
        font-size: 19px;
        line-height: 1.3157;
        font-weight: 400;
      }
    }
  }
`
