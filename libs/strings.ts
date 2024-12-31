export const countryCodeToFlagEmoji = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .split("")
    .map(char => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join("")
}

export const formatLatAndLon = (latOrLon: number) => {
  return (
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 4
    }).format(latOrLon) + "°"
  )
}
