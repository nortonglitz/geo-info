"use client"

import { useEffect } from "react"
import { Weather } from "@/services/open-meteo"

interface ILocationWeather {
  data?: Weather | null
}

export const LocationWeather = ({ data }: ILocationWeather) => {
  if (data === undefined) {
    return <div>Carregando...</div>
  }

  if (data === null) {
    return <div>Erro</div>
  }
  return (
    <article>
      {data.daily.apparent_temperature_max.map((max_tmp, i) => {
        return <div></div>
      })}
    </article>
  )
}
