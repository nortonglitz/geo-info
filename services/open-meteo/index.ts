import { insertQueryParamsOnURL } from "@/libs/strings"
import { OpenMeteoError, printOpenMeteoError } from "./error"

const BASE_URL = process.env.NOMINATIM_API_BASE_URL

type WeatherParams = {
  latitude: number
  longitude: number
  current?: string | string[]
  daily?: string | string[]
  timezone: string
}

type Coordinates = { lat: number; lon: number }

export const searchLocationWeatherByCoordinates = async (pos: Coordinates) => {
  try {
    const { lat, lon } = pos

    const url = insertQueryParamsOnURL<WeatherParams>(BASE_URL, {
      latitude: lat,
      longitude: lon,
      current: "temperature_2m",
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min"
      ],
      timezone: "America/Sao_Paulo"
    })

    const res = await fetch(url)

    if (!res.ok) {
      throw new OpenMeteoError("Faield to fetch weather data by coordinates.", res.status, url)
    }

    return await res.json()
  } catch (err) {
    printOpenMeteoError(err)
    throw err
  }
}
