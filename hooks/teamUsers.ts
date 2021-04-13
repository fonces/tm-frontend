import { useMemo, useCallback, ChangeEvent } from 'react'
import { range } from '@/utils/array'
import useTeams from '@/stores/teams'
import { Team } from '@/stores/teams/types'
import useUsers from '@/stores/users'
import { User } from '@/stores/users/types'

export type TeamUser = Team & {
  users: User[]
}

const dices = range(6, 36)

const useTeamUsers = () => {
  const { teams } = useTeams()
  const { users } = useUsers()

  const teamUsers = useMemo(() => teams.map(team => ({
    ...team,
    users: users.filter(({ teamId }) => teamId === team.id),
  }) as TeamUser), [teams, users])

  const entryTeamUsers = useMemo(() => (
    teams.map(team => ({
      ...team,
      users: users.filter(({ teamId, entry }) => teamId === team.id && entry),
    }) as TeamUser)
      .filter(({ users }) => users.length)),
  [teams, users])

  const isAllSettedDice = entryTeamUsers.every(({ dice }) => !!dice)

  const narrowDices = useCallback((myDice: number) => {
    const selectedDices = entryTeamUsers.map(({ dice }) => dice)
    return dices.filter(dice => !selectedDices.includes(dice) || dice === myDice)
  }, [entryTeamUsers])

  return {
    teamUsers,
    entryTeamUsers,
    isAllSettedDice,
    narrowDices,
  }
}

export default useTeamUsers
