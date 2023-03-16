import styled from 'styled-components'
import { RED, GREEN } from 'govuk-colours'

type TrendContainerProps = {
  positive: boolean
}

export const Container = styled.div<TrendContainerProps>`
    font-size: 14px;
    height: 22px;
    background-color: ${(p) => (p.positive ? `${GREEN}40` : `${RED}40`)};
    color: ${(p) => (p.positive ? `${GREEN}` : `${RED}`)};
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;

    background-image: 
        ${(p) =>
          p.positive
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23005A30' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23005A30' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E");`
            : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E");`}        
    background-repeat: no-repeat;
    padding-left: 26px;
    background-position: 6px center;
`
