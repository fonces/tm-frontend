import { useEffect } from 'react'
import { Dayjs } from 'dayjs'
import useClock, { Ignite } from '@/hooks/clock'

const useTimer = (func: (clock: Dayjs) => void, ignite: Ignite) => {
  const clock = useClock(ignite)
  useEffect(() => func(clock), [clock])
}

export default useTimer
