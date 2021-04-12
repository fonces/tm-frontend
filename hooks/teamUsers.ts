import { useMemo, ChangeEvent } from 'react'
import useTeams from '@/stores/teams'
import useUsers from '@/stores/users'
import { Team } from '@/stores/teams/types'
import { User } from '@/stores/users/types'

export type TeamUser = Team & {
  users: User[]
}

const useTeamUsers = () => {
  const { teams, byId: teamById, updateTeam } = useTeams()
  const { users, byId: userById, updateUser } = useUsers()

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

  const onChangeEntry = (id: string) => (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const user = userById[id]
    updateUser({
      ...user,
      entry: checked,
    })
  }

  const onChangeDice = (id: string) => (event: ChangeEvent<{ value: unknown }>) => {
    const team = teamById[id]
    const dice = event.target.value as string
    updateTeam({
      ...team,
      dice: +dice,
    })
  }

  const isAllSettedDice = entryTeamUsers.every(({ dice }) => !!dice)

  return {
    teamUsers,
    entryTeamUsers,
    isAllSettedDice,
    onChangeEntry,
    onChangeDice,
  }
}

export default useTeamUsers
