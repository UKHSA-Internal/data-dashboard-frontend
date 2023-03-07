import styled from 'styled-components'

export const Nav = styled.nav``

export const NavList = styled.ul`
  display: flex;
  margin-bottom: 20px;
  padding: 0;

  &:first-child {
    padding-top: 10px;
  }

  &:not(:last-child) {
    padding-bottom: 20px;
  }
`
