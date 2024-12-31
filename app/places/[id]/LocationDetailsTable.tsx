import { countryCodeToFlagEmoji, formatLatAndLon } from "@/libs/strings"
import { ILocationDetails } from "@/services/nominatim"

interface ILocationDetailsTable {
  details: ILocationDetails
  loading?: boolean
  className?: string
}

export const LocationDetailsTable = ({ details, loading, className }: ILocationDetailsTable) => {
  if (loading) {
    return <>Loading...</>
  }

  if (details) {
    return (
      <div
        className={`bg-white drop-shadow rounded-xl border-neutral-200 border overflow-hidden h-fit opacity-90 select-none pointer-events-none ${className}`}
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
