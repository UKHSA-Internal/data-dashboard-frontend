import React from 'react'
import styled from 'styled-components'
import { counties } from './uk-counties'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Container = styled.div`
  height: 600px;
  width: 100%;
  margin-top: 20px;

  div {
    text-align: center;
  }
`

const countyStyle = {
  fillColor: '#3388ff',
  fillOpacity: 0.4,
  color: '#1a1a1a',
  weight: 1.5,
}

const OpenStreetMap = () => {
  return (
    <Container>
      <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <GeoJSON data={counties} style={countyStyle} />
      </MapContainer>
    </Container>
  )
}

export default OpenStreetMap
