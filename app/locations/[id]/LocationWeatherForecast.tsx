"use client"

import { Weather } from "@/services/open-meteo"
import { IconTemperature, IconUmbrella, IconDatabaseOff } from "@tabler/icons-react"
import { Spinner } from "@/components"

interface ILocationWeatherForecast {
  data?: Weather | null
  className?: string
}

export const LocationWeatherForecast = ({ data, className }: ILocationWeatherForecast) => {
  // Placeholder carregamento
  if (data === undefined) {
    return (
      <div
        className={`
          bg-white
          border-neutral-200
          border
          rounded-xl
          overflow-hidden
          h-48
          flex
          justify-center
          items-center
          ${className}
        `}
      >
        <Spinner />
      </div>
    )
  }

  // Placeholder erro
  if (data === null) {
    return (
      <div
        className={`
          bg-white
          border-neutral-200
          border
          rounded-xl
          overflow-hidden
          h-48
          flex
          flex-col
          justify-center
          items-center
          ${className}
        `}
      >
        <IconDatabaseOff className="w-10 h-10 text-neutral-200" />
        <p className="text-neutral-400">Problema no servidor</p>
      </div>
    )
  }

  return (
    <article
      className={`
        flex
        bg-white
        border
        border-neutral-200
        rounded-xl
        ${className}
        justify-between
        overflow-hidden

        [&_img]:h-16
      `}
    >
      {data.daily.time.map((time, i) => (
        <section
          key={`${time}-${i}`}
          className="pt-2 pb-3 flex-1 flex flex-col items-center [&:nth-child(odd)]:bg-neutral-100"
        >
          <header
            title={new Date(data.daily.time[i]).toLocaleString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              timeZone: "UTC"
            })}
            className="cursor-help flex items-center text-nowrap bg-white border border-neutral-200 rounded-full text-neutral-500 mb-2"
          >
            <div className="border-r pl-2 pr-1">
              {new Date(data.daily.time[i]).toLocaleString("pt-BR", {
                day: "2-digit",
                timeZone: "UTC"
              })}
            </div>
            <div className="pl-1 pr-2">
              {new Date(data.daily.time[i]).toLocaleString("pt-BR", {
                weekday: "short",
                timeZone: "UTC"
              })}
            </div>
          </header>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1 [&>div]:cursor-help [&>div]:flex">
              <div title="Temperatura máxima">
                <IconTemperature className="text-red-500" />
                {Math.round(data.daily.temperature_2m_max[i]) + data.daily_units.temperature_2m_max}
              </div>
              <div title="Temperatura mínima">
                <IconTemperature className="text-blue-500" />
                {Math.round(data.daily.temperature_2m_min[i]) + data.daily_units.temperature_2m_min}
              </div>
              <div title="Probabilidade de precipitação">
                <IconUmbrella />
                {data.daily.precipitation_probability_max[i] +
                  data.daily_units.precipitation_probability_max}
              </div>
            </div>
            <figure>
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={`/assets/icons/weather/static/${data.daily.weather_code[i]}.svg`}
                alt="weather icon"
              />
            </figure>
          </div>
        </section>
      ))}
    </article>
  )
}
