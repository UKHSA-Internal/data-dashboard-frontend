import { Details, Link } from 'govuk-react'
import styled from 'styled-components'

export const Container = styled.div`
  background: #f8f8f8;
  padding: 10px;
`

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const Title = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1d70b8;
`

export const LabelContainer = styled.div`
  margin-left: 75px;
`

export const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  margin-bottom: 30px;
`

export const DataTableDropDown = styled(Details)`
  width: 100%;
`
