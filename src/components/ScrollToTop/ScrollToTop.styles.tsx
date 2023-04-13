import { Link } from 'govuk-react'
import styled from 'styled-components'

type ButtonProps = {
  isVisible: boolean
}

export const Button = styled(Link)<ButtonProps>`
  display: ${(p) => (p.isVisible ? 'flex' : 'none')};
  position: fixed;
  bottom: 20px;
  left: 20px;
  font-size: 16px;
  padding: 10px 20px;
  background-color: transparent;
  color: #1d70b8;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #003078;
    text-decoration: underline;

    & div {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%23003078' stroke-width='2' d='M6.864 14.364v-12m.207-.657L.707 8.071m6.5-5.778 6.364 6.364'/%3E%3Cpath stroke='%23003078' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E");
    }
  }
`

export const ArrowIcon = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%231D70B8' stroke-width='2' d='M6.864 14.364v-12m.207-.657L.707 8.071m6.5-5.778 6.364 6.364'/%3E%3Cpath stroke='%231D70B8' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  height: 16px;
  width: 16px;
  margin-right: 10px;
`
