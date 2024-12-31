"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Spinner } from "@/components"

interface IPlace {
  display_name?: string
  name?: string
  osm_id?: string
  osm_type?: string
}

interface IList {
  query?: string
}

export const List = ({ query }: IList) => {
  const [places, setPlaces] = useState<undefined | null | IPlace[]>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const searchQuery = async () => {
    try {
      let res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2`)
      if (!res.ok) {
        throw new Error("Server unavailable")
      }
      const data = await res.json()
      setPlaces(data)
    } catch {
      setPlaces(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (query && query.length > 2) {
      setIsLoading(true)
      searchQuery()
    } else {
      setPlaces(undefined)
      setIsLoading(false)
    }
  }, [query])

  const isList = Array.isArray(places)
  const isError = places === null
  const isEmpty = typeof places === "undefined"

  if (isEmpty && !isLoading) {
    return <></>
  }

  return (
    <section
      className="
        w-full
        bg-white
        rounded-xl
        border-neutral-200
        border
        overflow-hidden
      "
    >
      {isLoading && (
        <div className="flex justify-center my-2">
          <Spinner
            thickness={2}
            size={6}
          />
        </div>
      )}
      {!isLoading && isList && places.length > 0 && (
        <ul
          className="
            max-h-80
            overflow-y-auto

            [&_a]:flex
            [&_a]:flex-col
            [&_a]:p-2
            [&_a:hover]:bg-neutral-100

            [&_li:not(:last-child)]:border-b
            [&_li:not(:last-child)]:border-neutral-200

            [&_a_:last-child]:text-neutral-400
            [&_a_:last-child]:text-xs
            [&_a_:last-child]:text-justify
          "
        >
          {(places as IPlace[]).map(({ display_name, name, osm_id, osm_type }, i) => (
            <li key={osm_id || `place-${i}`}>
              <Link
                href={osm_type && osm_id ? `/places/${osm_type[0].toUpperCase() + osm_id}` : "#"}
              >
                <span>{name || "-"}</span>
                <span>{display_name || "-"}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && isList && places.length === 0 && (
        <>
          <h2 className="text-neutral-400 text-center text-lg my-4 italic">Lugar não encontrado</h2>
          <Image
            className="w-48 m-auto"
            src="/location-lost.svg"
            width={885}
            height={708}
            alt="Not found"
          />
        </>
      )}
      {!isLoading && isError && "error"}
    </section>
  )
}
