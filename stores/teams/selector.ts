import { useMemo } from 'react'

import { State } from './types'

const selector = ({ byId }: State) => useMemo(() => {
  const ids = Object.keys(byId)
  const teams = ids.map(id => ({ ...byId[id] }))

  return {
    ids,
    teams,
    byId,
  }
}, [byId])

export default selector
