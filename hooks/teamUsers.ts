import { useMemo, ChangeEvent } from 'react'
import useTeams from '@/stores/teams'
import useUsers from '@/stores/users'

const useTeamUsers = () => {
  const { teams, byId: teamById, updateTeam } = useTeams()
  const { users, byId: userById, updateUser } = useUsers()

  const teamUsers = useMemo(() => teams.map(team => ({
    ...team,
    users: users.filter(user => team.id === user.teamId),
  })), [teams, users])

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

  return {
    teamUsers,
    onChangeEntry,
    onChangeDice,
  }
}

export default useTeamUsers
