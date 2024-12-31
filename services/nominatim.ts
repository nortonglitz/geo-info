import { insertQueryParamsOnURL } from "@/libs/strings"
const BASE_URL = "https://nominatim.openstreetmap.org"

export interface ILocationDetails {
  name: string
  lat: number
  lon: number
  address: {
    country?: string
    region?: string
    state?: string
    city?: string
    suburb?: string
    country_code?: string
  }
}

export const searchLocationDetailsById = async (osm_id: string) => {
  const url = insertQueryParamsOnURL(`${BASE_URL}/lookup`, {
    osm_ids: osm_id,
    format: "jsonv2"
  })

  const res = await fetch(url, {
    headers: {
      "Accept-Language": "pt-BR"
    }
  })

  console.log(res)

  if (!res.ok) {
    throw new Error("Server error")
  }

  const locationDetails: ILocationDetails[] = await res.json()
  return locationDetails[0]
}

export interface ILocation {
  display_name?: string
  name?: string
  osm_id?: string
  osm_type?: string
}

export const searchLocationsByQuery = async (query: string) => {
  const url = insertQueryParamsOnURL(`${BASE_URL}/search`, {
    q: query,
    format: "jsonv2"
  })

  let res = await fetch(url, {
    headers: {
      "Accept-Language": "pt-BR"
    }
  })
  if (!res.ok) {
    throw new Error("Server unavailable")
  }
  const locations: ILocation[] = await res.json()
  return locations
}
