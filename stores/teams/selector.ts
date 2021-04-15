import { useMemo } from 'react'

import { State } from './types'

const selector = ({ byId }: State) => useMemo(() => {
  const ids = Object.keys(byId)
  const teams = ids.map(id => ({ ...byId[id] }))
  const entryTeams = teams.filter(({ users }) => users > 0)
  const diceSorted = [...entryTeams].sort((a, b) => a.dice - b.dice)
  const isAllSettedDice = entryTeams.every(({ dice }) => !!dice)

  return {
    teams,
    entryTeams,
    diceSorted,
    isAllSettedDice,
    ids,
    byId,
  }
}, [byId])

export default selector
