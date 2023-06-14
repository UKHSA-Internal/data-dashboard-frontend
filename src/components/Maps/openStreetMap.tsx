import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const OpenStreetMap = () => {
  return (
    // <div>map container</div>
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
    </MapContainer>
  )
}

export default OpenStreetMap
