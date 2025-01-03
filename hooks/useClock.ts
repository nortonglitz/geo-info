"use client"

import { useEffect, useState } from "react"

/**
 * Hook para iniciar um relógio que começa num tempo inicial e atualiza a cada 1 segundo.
 *
 * @param {string} [initialTime] - Tempo inicial opcional, se não fornecido inicializa no tempo de agora.
 *
 * @returns {Date} - Uma `Date` atualizada a cada 1 segundo.
 *
 * @example
 * // Example usage:
 * const currentTime = useClock("2025-01-01T00:00:00Z");
 * console.log(currentTime.toLocaleTimeString());
 *
 * @note
 * Se for fornecida uma data errada em initalTime, o tempo será o atual.
 */
export const useClock = (initialTime?: string): Date => {
  // Se não for válida a data, inicializa com o tempo atual
  const [time, setTime] = useState<Date>(() => {
    if (initialTime) {
      const parsedTime = new Date(initialTime)
      return isNaN(parsedTime.getTime()) ? new Date() : parsedTime
    }
    return new Date()
  })

  // Torna o hook reativo a mudanças do initialTime
  useEffect(() => {
    if (initialTime) {
      const parsedTime = new Date(initialTime)

      if (!isNaN(parsedTime.getTime())) {
        setTime(new Date(parsedTime))
      }
    }
  }, [initialTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => new Date(prevTime.getTime() + 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return time
}
