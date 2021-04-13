import { useMemo } from 'react'

import { State } from './types'

const selector = ({ priority }: State) => useMemo(() => {
  return {
    priority,
  }
}, [priority])

export default selector
