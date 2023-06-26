import { HeadlineTrend } from '@/components/Metrics'
import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

const OpenStreetMap = dynamic(() => import('@/components/Maps/openStreetMap'), {
  loading: () => <span>Loading...</span>,
  ssr: false,
})

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

const SearchButton = styled.input`
  border: 2px solid #000;
  margin-bottom: 20px;
  padding: 6px;
  font-size: 18px;
`

const Maps = () => {
  const handleSubmit = async () => {
    console.log('Submitted form')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SearchButton type="text" placeholder="POSTCODE" />
        <button type="submit">Search</button>
      </form>

      <ResultContainer>
        <h1>Buckinghamshire</h1>
        <span>Seven days to 3 June 2023</span>

        <FieldHeader>Total Cases</FieldHeader>
        <FieldResult>46</FieldResult>
        <HeadlineTrend heading="" change={-14} percentage={-23.3} direction="down" colour="green" />

        <FieldHeader>Case rate per 100,000 people</FieldHeader>
        <FieldResult>8.4</FieldResult>
      </ResultContainer>

      <OpenStreetMap />
    </>
  )
}

export default Maps
