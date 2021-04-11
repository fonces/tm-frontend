export type User = {
  id: number
  name: string
}
export type Team = {
  id: number
  name: string
  dice: number
  users: User[]
}

type Columns = 'teamId' | 'teamName' | 'userId' | 'userName'

const getTeams = () => fetch(process.env.endPoint!)
  .then(res => res.json())
  .then(res => (res as Record<Columns, string>[]).map(({ teamId, teamName, userId, userName }) => ({
    teamId: +teamId,
    teamName,
    userId: +userId,
    userName,
  })))
  .then(res => res.reduce<Team[]>((acc, { teamId, teamName, userId, userName }) => {
    if (!acc.find(t => t.id === teamId)) {
      acc.push({
        id: teamId,
        name: teamName,
        dice: 0,
        users: [],
      })
    }
    acc
      .find(t => t.id === teamId)!
      .users
      .push({ id: userId, name: userName })
    return acc
  }, []))

export default getTeams
