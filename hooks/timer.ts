import { useEffect } from 'react'
import useClock, { Ignite } from '@/hooks/clock'

const useTimer = (func: () => void, ignite: Ignite) => {
  const clock = useClock(ignite)
  useEffect(func, [clock])
}

export default useTimer
