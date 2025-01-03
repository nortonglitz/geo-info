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
 * A URL precisa estar no formato `https://example.com`, não pode estar no formato
 * `https://example.com/` ou `https://example.com?`, ou derivados.
 * Os valores em `params` podem ser strings, números, booleanos ou arrays.
 * Outros tipos não são suportados e resultarão em erro.
 *
 * @template T
 * @param {string} url - A URL base onde os parâmetros serão adicionados.
 * @param {T} params - Um objeto contendo os pares chave-valor a serem transformados em query params.
 *                     Os valores podem ser strings, números, booleanos ou arrays.
 * @returns {string} A URL com os parâmetros de consulta adicionados.
 *
 * @throws {Error} Se algum valor em `params` não for suportado (como objetos ou funções).
 *
 * @example
 * const url = 'https://example.com';
 * const params = { key: 'value', page: 1, filters: ['open', 'closed'], active: true };
 * insertQueryParamsOnURL(url, params);
 * // Resultado: "https://example.com?key=value&page=1&filters=open,closed&active=true"
 *
 * @example
 * const url = 'https://example.com';
 * const params = { invalid: { key: 'value' } }; // Tipo não suportado
 * insertQueryParamsOnURL(url, params);
 * // Lança erro: "Unsupported query parameter value: invalid=[object Object]"
 */

export const insertQueryParamsOnURL = <T extends Record<string, unknown>>(
  url: string,
  params: T
): string => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`
      } else if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      }
      throw new Error(`Unsupported query parameter value: ${key}=${value}`)
    })
    .join("&")

  return `${url}?${queryParams}`
}
