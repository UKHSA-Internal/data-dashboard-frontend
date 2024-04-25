'use client'

import 'leaflet/dist/leaflet.css'

import Leaflet, { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import { CSSProperties, useMemo, useState } from 'react'
import VectorBasemapLayer from 'react-esri-leaflet/plugins/VectorBasemapLayer'
import { GeoJSON, LayersControl, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'

// GeoJSON data
import { featureCollection } from '../data'

// Defaults
const zoom = 7
const center: LatLngExpression = [52.7957, -1.5479]
const featureNameIdentifier = 'phec16nm'
const defaultStyle: CSSProperties = { height: '75vh' }

// Custom marker icon
const customMarkerIcon = Leaflet.divIcon({
  html: `<svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.546 3.4519C24.3995 3.47416 25.2096 3.95653 25.6351 4.6974L44.6243 39.9053C45.3689 41.3747 44.3015 43.4279 42.4945 43.4712H4.51474C2.86356 43.4316 1.57477 41.5033 2.38614 39.9053L21.3754 4.6974C21.5886 4.31109 21.9038 3.99069 22.2865 3.77108C22.6693 3.55147 23.1049 3.44107 23.546 3.4519Z" fill="#F18700"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.6038 1.31656H23.5642C21.7893 1.30295 20.3484 2.19472 19.5222 3.63564L19.5037 3.66903L0.498342 38.9067L0.481026 38.9401C-1.03411 41.9283 1.37526 45.5337 4.46366 45.6079L4.49829 45.6091H42.5126L42.5473 45.6079C45.9263 45.5262 47.9238 41.6883 46.5299 38.9401L46.5126 38.9067L27.5073 3.66903C27.5013 3.65816 27.4952 3.64744 27.4887 3.63688C26.6984 2.2578 25.1907 1.35861 23.6038 1.31656ZM23.5469 3.45259C24.4003 3.47485 25.2104 3.95722 25.6359 4.69809L44.6252 39.906C45.3697 41.3754 44.3023 43.4286 42.4953 43.4718H4.51561C2.86442 43.4323 1.57563 41.504 2.387 39.906L21.3762 4.69809C21.5895 4.31178 21.9046 3.99138 22.2874 3.77177C22.6701 3.55216 23.1058 3.44176 23.5469 3.45259ZM23.1016 6.79948C23.1409 6.7264 23.1992 6.66536 23.2705 6.62288C23.3417 6.58039 23.4231 6.55807 23.5061 6.5583C23.6743 6.5583 23.8301 6.65106 23.9105 6.79948L41.9684 40.3043C42.0451 40.4478 42.0414 40.6197 41.9585 40.7582C41.8757 40.8967 41.7248 40.9821 41.564 40.9821H5.44818C5.36842 40.9827 5.28989 40.9624 5.22039 40.9232C5.15088 40.8841 5.09281 40.8275 5.05194 40.759C5.01107 40.6905 4.98881 40.6125 4.98737 40.5327C4.98593 40.453 5.00536 40.3742 5.04374 40.3043L23.1016 6.79948Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.1699 21.9137V23.393L22.7871 20.3825C22.9404 20.2069 23.1643 20.1055 23.3981 20.1055C23.6318 20.1055 23.8545 20.2081 24.0078 20.385L31.5835 29.1431C31.8742 29.4807 31.8383 29.9903 31.5019 30.2822C31.1654 30.5741 30.6534 30.537 30.3615 30.1993L29.6701 29.4003V34.0076C29.4326 34.0261 29.3164 34.0892 29.1086 34.2191C28.876 34.3625 28.5693 34.6458 28.0709 34.8758C27.6902 35.0449 27.2777 35.1305 26.8612 35.1269H26.8278C26.2586 35.123 25.7032 34.9514 25.2311 34.6334C24.8526 34.3811 24.625 34.1857 24.4247 34.0991C24.2714 34.0296 24.1043 33.9962 23.9361 34.0014C23.6145 34.0088 23.4946 34.0707 23.2558 34.2191C23.0171 34.3675 22.7178 34.6458 22.2181 34.8758C21.8867 35.0267 21.4736 35.1282 21.0097 35.1269C20.3332 35.1319 19.7766 34.8894 19.3944 34.647L18.5694 34.1003C18.4445 34.041 18.3666 34.0187 18.2343 34.0162C17.9807 34.0051 17.5453 34.1844 17.0494 34.4565V29.4449L16.3555 30.2426C16.2797 30.3303 16.1859 30.4006 16.0804 30.4486C15.975 30.4966 15.8604 30.5213 15.7445 30.5209C15.5577 30.5209 15.3685 30.4554 15.2151 30.323C14.8787 30.0299 14.8428 29.5191 15.136 29.1827L18.28 25.5674V21.9137H20.1699Z" fill="#181C1B"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M26.0391 29.502H28.4559V32.1612H26.0391V29.502Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M39.9388 39.5301H7.05859L8.83594 36.25H9.35788C9.71162 36.5506 10.147 36.8919 10.6059 37.1863C10.8705 37.3557 11.1426 37.5103 11.4259 37.6316C11.7214 37.7685 12.0416 37.8438 12.3671 37.8529C13.296 37.8294 13.9738 37.3829 14.6256 37.0527C15.27 36.7002 15.8563 36.4454 16.2533 36.4578C16.4536 36.459 16.5897 36.4998 16.7666 36.5852C17.0288 36.7089 17.3541 36.9834 17.8241 37.2803C18.2941 37.5771 18.9446 37.8591 19.7548 37.8529C20.2508 37.8583 20.7422 37.7571 21.1957 37.5561C21.7906 37.284 22.1679 36.9389 22.4771 36.7447C22.7949 36.5468 22.9978 36.4467 23.448 36.438C23.69 36.4323 23.9301 36.4814 24.1505 36.5815C24.4399 36.7052 24.7343 36.9612 25.1944 37.2654C25.6471 37.5672 26.31 37.8616 27.14 37.8529C27.699 37.8542 28.1863 37.7342 28.5821 37.5561C29.1783 37.284 29.5543 36.9389 29.8647 36.7447C30.1826 36.5468 30.3854 36.4454 30.8344 36.438C31.1387 36.4343 31.4986 36.5629 31.7707 36.7126C31.9068 36.7868 32.0205 36.8622 32.0948 36.9167L32.1776 36.9785L32.2506 37.0366C32.7107 37.3792 33.4491 37.8529 34.4856 37.8529H34.5276C35.4676 37.8356 36.2691 37.4015 36.9605 36.9686C37.2721 36.768 37.5715 36.5491 37.8572 36.3131L37.9339 36.25H38.1664L39.9388 39.5301Z" fill="#00A4CD"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.546 3.72143C24.3995 3.74369 25.2096 4.22606 25.6351 4.96693L44.6243 40.1749C45.3689 41.6442 44.3015 43.6974 42.4945 43.7407H4.51474C2.86356 43.7011 1.57477 41.7729 2.38614 40.1749L21.3754 4.96693C21.5886 4.58062 21.9038 4.26022 22.2865 4.04061C22.6693 3.821 23.1049 3.7106 23.546 3.72143Z" stroke="#F18700" stroke-width="1.15" stroke-miterlimit="1.41421" stroke-linejoin="round"/>
</svg>`,
  className: '',
})

interface MapProps {
  style?: CSSProperties
}

export default function Map({ style }: MapProps) {
  const [clickedFeature, setClickedFeature] = useState<string | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  const handleClick = (event: LeafletMouseEvent) => {
    const featureId = event.target.feature.properties[featureNameIdentifier]
    setClickedFeature(featureId)
  }
  const handleMouseOver = (event: LeafletMouseEvent) => {
    const featureId = event.target.feature.properties[featureNameIdentifier]
    setHoveredFeature(featureId)
  }
  const handleMouseOut = () => {
    setHoveredFeature(null)
  }

  const displayMap = useMemo(() => {
    return (
      <MapContainer center={center} zoom={zoom} scrollWheelZoom zoomControl={false} style={style || defaultStyle}>
        <ZoomControl position="bottomright" />
        <LayersControl position="bottomright">
          <LayersControl.BaseLayer name="OpenStreetMaps Default" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri ArcGIS:Streets">
            <VectorBasemapLayer name="ArcGIS:Streets" apiKey={process.env.NEXT_PUBLIC_ESRI_API_KEY} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri ArcGIS:Navigation">
            <VectorBasemapLayer name="ArcGIS:Navigation" apiKey={process.env.NEXT_PUBLIC_ESRI_API_KEY} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri ArcGIS:DarkGray">
            <VectorBasemapLayer name="ArcGIS:DarkGray" apiKey={process.env.NEXT_PUBLIC_ESRI_API_KEY} />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="UKHSA GeoJSON" checked>
            <GeoJSON
              data={featureCollection}
              onEachFeature={(feature, layer) => {
                console.log('FEATURE: ', feature)
                console.log('LAYER: ', layer)
                layer.on({
                  click: handleClick,
                  mouseover: handleMouseOver,
                  mouseout: handleMouseOut,
                })
              }}
              style={(feature) => {
                if (!feature) return {}

                const featureId = feature.properties[featureNameIdentifier]
                const isHovered = hoveredFeature === featureId
                const isClicked = clickedFeature === featureId

                const fillOpacity = isClicked ? 0.85 : isHovered ? 0.65 : 0.55
                const className = 'transition-all duration-200'

                switch (featureId) {
                  case 'North East':
                  case 'North West':
                    return {
                      weight: 1,
                      color: 'white',
                      fillColor: 'var(--colour-red)',
                      fillOpacity,
                      className,
                    }
                  case 'East of England':
                  case 'London':
                    return {
                      weight: 1,
                      color: 'white',
                      fillColor: 'var(--colour-orange)',
                      fillOpacity,
                      className,
                    }
                }
                return {
                  weight: 1,
                  color: 'white',
                  fillColor: 'var(--colour-green)',
                  fillOpacity,
                  className,
                }
              }}
            ></GeoJSON>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Marker 1">
            <Marker position={[52, -1]} icon={customMarkerIcon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    )
  }, [clickedFeature, hoveredFeature, style])

  return (
    <>
      {/* <h3 className="govuk-heading-m mb-0">Selected region</h3>
      <p>{clickedFeature || '-'}</p> */}
      {displayMap}
    </>
  )
}
