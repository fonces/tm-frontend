import { useState, useEffect } from 'react'

type Fire = Partial<{
  hours: number
  minutes: number
  seconds: number
}>

/**
 * 指定した時刻になったらstateを更新する時計を作成する
 * @param fire Fire
 */
const useClock = (fire: Fire = {}) => {
  const [clock, setClock] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      if (
        (fire.hours === undefined || now.getHours() === fire.hours) &&
        (fire.minutes === undefined || now.getMinutes() === fire.minutes) &&
        (fire.seconds === undefined || now.getSeconds() === fire.seconds)
      ) {
        setClock(now)
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return clock
}

export default useClock
