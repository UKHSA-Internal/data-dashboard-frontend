import styled from 'styled-components'

export const CMSContent = styled.div`
  && {
    h1 {
      font-size: 48px;
      line-height: 1.0416;
      font-weight: 700;
      display: block;
      margin-top: 0;
    }

    h2 {
      margin-bottom: 30px;
      font-size: 36px;
      line-height: 1.1112;
      font-weight: 700;
      display: block;
      margin-top: 0;
    }

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

    a:hover,
    a:active {
      color: #2b8cc4;
    }

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
