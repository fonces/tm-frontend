import { useEffect, useCallback, DependencyList } from 'react'

import usePrevious from '@/hooks/previous'

const useWindow = (event: () => void, deps: DependencyList = []) => {
  const cacheEvent = useCallback(() => event(), deps)
  const prevCacheEvent = usePrevious(cacheEvent)

  useEffect(() => {
    if (prevCacheEvent) {
      window.removeEventListener('resize', prevCacheEvent)
    }

    cacheEvent()
    window.addEventListener('resize', cacheEvent)

    return () => window.removeEventListener('resize', cacheEvent)
  }, [cacheEvent])
}

export default useWindow
