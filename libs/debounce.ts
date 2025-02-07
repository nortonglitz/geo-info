// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(fc: T, timer: number) => {
  let timeout: NodeJS.Timeout | undefined

  const debouncedFunction = (...args: Parameters<T>): ReturnType<T> | void => {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => fc(...args), timer)
  }

  debouncedFunction.cancel = () => {
    if (timeout) clearTimeout(timeout)
  }

  return debouncedFunction
}
