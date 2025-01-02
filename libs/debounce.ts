export const debounce = <T extends (...args: unknown[]) => unknown>(fc: T, timer: number) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      fc(...args)
    }, timer)
  }
}
