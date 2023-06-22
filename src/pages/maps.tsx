import { HeadlineTrend } from '@/components/Metrics'
import React from 'react'
import styled from 'styled-components'

const ResultContainer = styled.div`
  padding: 10px;
  border: 2px solid #000;
`

const FieldHeader = styled.h2`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 500;
`

const FieldResult = styled.span`
  font-size: 26px;
  font-weight: 800;
`

const Maps = () => {
  return (
    <ResultContainer>
      <h1>Buckinghamshire</h1>
      <span>Seven days to 3 June 2023</span>

      <FieldHeader>Total Cases</FieldHeader>
      <FieldResult>46</FieldResult>
      <HeadlineTrend heading="" change={-14} percentage={-23.3} direction="down" colour="green" />

      <FieldHeader>Case rate per 100,000 people</FieldHeader>
      <FieldResult>8.4</FieldResult>
    </ResultContainer>
  )
}

export default Maps
