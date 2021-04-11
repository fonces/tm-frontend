import { useMemo, ChangeEvent } from 'react'
import useTeams from '@/stores/teams'
import useUsers from '@/stores/users'

const useTeamUsers = () => {
  const { teams } = useTeams()
  const { users, byId: userById, updateUser } = useUsers()

  const teamUsers = useMemo(() => teams.map(team => ({
    ...team,
    users: users.filter(user => team.id === user.teamId),
  })), [teams, users])

  const onEntry = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const id = event.currentTarget!.value
    const user = userById[id]
    updateUser({
      ...user,
      entry: checked,
    })
  }

  return {
    teamUsers,
    onEntry,
  }
}

export default useTeamUsers
