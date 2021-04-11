import { Team } from '@/pages/utils/teams'
const ENDPOINT = process.env.endPoint!

type Columns = 'teamId' | 'teamName' | 'userId' | 'userName'

const getTeams = () => fetch(ENDPOINT)
  .then(res => res.json())
  .then(res => (res as Record<Columns, string>[]).map(({ teamId, teamName, userId, userName }) => ({
    teamId: +teamId,
    teamName,
    userId: +userId,
    userName
  })))
  .then(res => res.reduce<Team[]>((acc, { teamId, teamName, userId, userName }) => {
    if (!acc.find(t => t.id === teamId)) {
      acc.push({
        id: teamId,
        name: teamName,
        dice: 0,
        users: []
      })
    }
    acc
      .find(t => t.id === teamId)!
      .users
      .push({ id: userId, name: userName })
    return acc
  }, []))

export default getTeams
