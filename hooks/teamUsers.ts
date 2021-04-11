import { useMemo } from 'react'
import useTeams from '@/stores/teams'
import useUsers from '@/stores/users'

const useTeamUsers = () => {
  const { teams } = useTeams()
  const { users } = useUsers()

  const teamUsers = useMemo(() => teams.map(team => ({
    ...team,
    users: users.filter(user => team.id === user.teamId),
  })), [teams, users])

  return {
    teamUsers,
  }
}

export default useTeamUsers
