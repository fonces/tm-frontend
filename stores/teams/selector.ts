import { useMemo } from 'react'
import { Team } from './types'
import { State } from './context'

const selector = ({ teams }: State) => useMemo(() => {
  const ids = teams.map(team => team.id)
  const byId = teams.reduce<{ [key: number ]: Team }>((acc, team) => ({ ...acc, [team.id]: team }), {})

  return {
    ids,
    byId,
  }
}, [teams])

export default selector
