"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import L from "leaflet"

const DefaultIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41], // Tamanho do ícone
  iconAnchor: [12, 41], // Ponto onde o ícone se ancora no mapa
  popupAnchor: [1, -34], // Ponto onde o popup aparece
  shadowSize: [41, 41] // Tamanho da sombra
})

L.Marker.prototype.options.icon = DefaultIcon

export interface IMap {
  position: LatLngExpression
  className?: string
}

const Map = ({ position, className }: IMap) => {
  return (
    <MapContainer
      className={`${className} w-full h-full`}
      center={position}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} />
    </MapContainer>
  )
}

export default Map
