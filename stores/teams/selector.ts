import { useMemo } from 'react'

import { State, Team } from './types'

const selector = ({ byId }: State) => useMemo(() => {
  const ids = Object.keys(byId)
  const teams = ids.map(id => ({ ...byId[id] }))
  const allUsers = teams.reduce((acc, { users }) => acc + users, 0)
  const entryTeams = teams.filter(({ users }) => 0 < users)
  const settedDiceTeams = entryTeams.filter(({ dice }) => !!dice)
  const sortedTeams = Object.values(
    [...entryTeams]
      .sort((a, b) => a.dice - b.dice)
      .reduce<{ [key: string]: Team[]}>((acc, team) => ({
        ...acc,
        [team.dice]: [...(acc[team.dice] || []), team],
      }), {}),
  )
    .map(group => group.sort((a, b) => a.priority - b.priority))
    .flat()

  const isButtingDice = (currentId: string, currentDice: number) => (
    settedDiceTeams
      .filter(({ id }) => id !== currentId)
      .some(({ dice }) => dice === currentDice)
  )

  const buttingDiceGroup = Object.values(
    settedDiceTeams
      .filter(({ id, dice }) => isButtingDice(id, dice))
      .reduce<{ [key: string]: Team[]}>((acc, team) => ({
        ...acc,
        [team.dice]: [...(acc[team.dice] || []), team],
      }), {}),
  )

  const isAllSettedDice = entryTeams.length === settedDiceTeams.length
  const isAllSettedPriority = buttingDiceGroup
    .every(group => group.every(({ id: currentId, priority: currentPriority }) => (
      group
        .filter(({ id }) => id !== currentId)
        .every(({ priority }) => priority !== currentPriority)
    )))

  return {
    ids,
    byId,
    teams,
    entryTeams,
    sortedTeams,
    settedDiceTeams,
    allUsers,
    isAllSettedDice,
    isAllSettedPriority,
    isButtingDice,
  }
}, [byId])

export default selector
