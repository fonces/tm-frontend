import { useEffect, useCallback } from 'react'

const useWindow = (event: () => void) => {
  const cacheEvent = useCallback(() => event(), [])
  useEffect(() => {
    cacheEvent()
    window.addEventListener('resize', cacheEvent)
    return () => window.removeEventListener('resize', cacheEvent)
  }, [])
}

export default useWindow
