import { useMemo } from 'react'
import { State } from './types'

const selector = ({ byId }: State) => useMemo(() => {
  const ids = Object.keys(byId)
  const users = ids.map(id => byId[id])

  return {
    ids,
    users,
    byId,
  }
}, [byId])

export default selector
