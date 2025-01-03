import { Spinner } from "@/components"
import { countryCodeToFlagEmoji, formatLatAndLon } from "@/libs/strings"
import { ILocationDetails } from "@/services/nominatim"
import { IconDatabaseOff } from "@tabler/icons-react"

interface ILocationDetailsTable {
  details?: ILocationDetails | null
  className?: string
}

export const LocationDetailsTable = ({ details, className }: ILocationDetailsTable) => {
  // Placeholder
  if (details === undefined) {
    return (
      <div
        className={`bg-white rounded-xl border-neutral-200 border h-48 flex justify-center items-center ${className}}`}
      >
        <Spinner />
      </div>
    )
  }

  if (details === null) {
    return (
      <div
        className={`bg-white rounded-xl border-neutral-200 border h-48 flex flex-col items-center justify-center ${className}`}
      >
        <IconDatabaseOff className="w-10 h-10 text-neutral-200" />
        <p className="text-neutral-400">Problema no servidor</p>
      </div>
    )
  }
  /////////////////

  if (details) {
    return (
      <div
        className={`bg-white rounded-xl border-neutral-200 border overflow-hidden h-fit ${className}`}
      >
        <table className="w-full">
          <tbody
            className="
              [&_td]:px-2
              [&_td]:py-1
              [&_td:first-child]:font-medium

              [&_tr:nth-child(odd)]:bg-neutral-100
          "
          >
            <tr>
              <td>Latitude</td>
              <td>{(details.lat && formatLatAndLon(details.lat)) || "-"}</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>{(details.lat && formatLatAndLon(details.lon)) || "-"}</td>
            </tr>
            {details.address.suburb && (
              <tr>
                <td>Bairro</td>
                <td>{details.address.suburb}</td>
              </tr>
            )}
            {details.address.city && (
              <tr>
                <td>Cidade</td>
                <td>{details.address.city}</td>
              </tr>
            )}
            {details.address.state && (
              <tr>
                <td>Estado</td>
                <td>{details.address.state}</td>
              </tr>
            )}
            {details.address.region && (
              <tr>
                <td>Região</td>
                <td>{details.address.region}</td>
              </tr>
            )}
            {details.address.country && (
              <tr>
                <td>País</td>
                <td>
                  {details.address.country}
                  {details.address.country_code &&
                    " " + countryCodeToFlagEmoji(details.address.country_code)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
