import { useState, useEffect } from 'react'
import dayjs, { UnitTypeLong } from 'dayjs'

export type Observe = Exclude<UnitTypeLong, 'millisecond'>
export type Ignite = Partial<Record<Observe, number>>

const MIN_IGNITE_MS = 1000 as const
const OBSERVES: Readonly<Observe[]> = [
  'second',
  'minute',
  'hour',
  'day',
  'month',
  'year',
  'date',
] as const

const useClock = (ignite: Ignite = {}) => {
  const [clock, setClock] = useState(() => dayjs())
  const isAlwaysIgnite = Object.keys(ignite).length === 0

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = dayjs()
      if (
        isAlwaysIgnite ||
        OBSERVES.every(
          key => ignite[key] === undefined || now[key]() === ignite[key],
        )
      ) {
        setClock(now)
      }
    }, MIN_IGNITE_MS)

    return () => clearInterval(intervalId)
  }, [])

  return clock
}

export default useClock
