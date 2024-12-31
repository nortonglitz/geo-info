"use client"

import { useEffect, useState } from "react"
import { LocationDetailsTable } from "./LocationDetailsTable"
import { useParams } from "next/navigation"
import { ILocationDetails, searchLocationDetailsById } from "@/services/nominatim"
import dynamic from "next/dynamic"
import { Spinner } from "@/components"

export default function PlaceDetail() {
  const { id } = useParams()
  const [locDetails, setLocDetails] = useState<null | undefined | ILocationDetails>(undefined)

  const searchLocationDetails = async () => {
    try {
      setLocDetails(await searchLocationDetailsById(id as string))
    } catch {
      setLocDetails(null)
    }
  }

  const mapPlaceholder = (
    <div className="col-span-3 h-96 border border-neutral-200 rounded-xl w-full flex items-center justify-center">
      <Spinner />
    </div>
  )

  const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => mapPlaceholder
  })

  useEffect(() => {
    if (id && typeof id == "string") {
      searchLocationDetails()
    }
  }, [id])

  return (
    <>
      <main className="flex justify-center">
        <article className="w-full xl:w-4/6">
          <h1 className="text-3xl text-blue-800 font-medium border-b mt-4 mb-4">
            {locDetails && locDetails.name}
          </h1>
          <section className="min-h-96 grid grid-cols-3 gap-4">
            {locDetails && locDetails.lon && locDetails.lat && (
              <Map
                className="col-span-3 h-96 border border-neutral-200 rounded-xl w-full"
                position={[locDetails.lat, locDetails.lon]}
              />
            )}
            <LocationDetailsTable
              details={locDetails}
              className="col-span-3 md:col-span-1"
            />
          </section>
        </article>
      </main>
    </>
  )
}