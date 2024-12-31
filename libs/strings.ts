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

/**
 * Adiciona parâmetros de consulta (query params) a uma URL.
 * A URL precisa estar no formato https://example.com, não pode estar
 * https://example.com/ ou https://example.com?, ou derivados.
 *
 * @param {string} url - A URL base onde os parâmetros serão adicionados.
 * @param {T} params - Um objeto contendo os pares chave-valor a serem transformados em query params.
 * @returns {string} A URL com os parâmetros de consulta adicionados.
 *
 * @example
 * const url = 'https://example.com';
 * const params = { key: 'value', page: 1 };
 * insertQueryParamsOnURL(url, params);
 * // Resultado: "https://example.com?key=value&page=1"
 */
export const insertQueryParamsOnURL = <T extends Record<string, any>>(url: string, params: T) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&")

  return `${url}?${queryParams}`
}
