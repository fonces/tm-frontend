import { useMemo } from 'react'

import { State } from './types'

const selector = ({ byId }: State) => useMemo(() => {
  const ids = Object.keys(byId)
  const users = ids.map(id => byId[id])
  const entryUsers = users.filter(({ entry }) => entry)

  return {
    ids,
    users,
    entryUsers,
    byId,
  }
}, [byId])

export default selector
