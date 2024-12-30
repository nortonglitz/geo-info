export const debounce = <T extends (...args: any[]) => any>(fc: T, timer: number) => {
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
