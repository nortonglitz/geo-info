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
  const res = await fetch(
    `https://nominatim.openstreetmap.org/lookup?osm_ids=${osm_id}&format=jsonv2`,
    {
      headers: {
        "Accept-Language": "pt-BR"
      }
    }
  )

  if (!res.ok) {
    throw new Error("Server error")
  }

  const locationDetails: ILocationDetails[] = await res.json()
  return locationDetails[0]
}
