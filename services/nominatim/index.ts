import { insertQueryParamsOnURL } from "@/libs/strings"
import { NominatimError, printNominatimError } from "./error"

const BASE_URL = process.env.OPENMETEO_API_BASE_URL

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
  try {
    const url = insertQueryParamsOnURL(`${BASE_URL}/lookup`, {
      osm_ids: osm_id,
      format: "jsonv2"
    })

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "pt-BR"
      }
    })

    if (!res.ok) {
      throw new NominatimError("Faield to fetch location details by id.", res.status, url)
    }

    const locationDetails: ILocationDetails[] = await res.json()
    return locationDetails[0]
  } catch (err) {
    printNominatimError(err)
    throw err
  }
}

export interface ILocation {
  display_name?: string
  name?: string
  osm_id?: string
  osm_type?: string
}

export const searchLocationsByQuery = async (query: string) => {
  try {
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
      throw new NominatimError("Faield to fetch location details by query.", res.status, url)
    }
    const locations: ILocation[] = await res.json()
    return locations
  } catch (err) {
    printNominatimError(err)
    throw err
  }
}
