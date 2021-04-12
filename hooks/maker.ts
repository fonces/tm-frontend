import { useMemo } from 'react'
import useTeamUsers from '@/hooks/teamUsers'
import useTeams from '@/stores/teams'
import useSettings from '@/stores/settings'
import { divisionNumbers, parseTables, allocation } from '@/utils/table'

const useMaker = () => {
  const { byId: teamsById } = useTeams()
  const { entryTeamUsers } = useTeamUsers()
  const { priority } = useSettings()

  const {
    users,
    numbers,
    tables,
    allocate,
  } = useMemo(() => {
    const users = entryTeamUsers.reduce((acc, team) => acc + team.users.length, 0)
    const numbers = divisionNumbers(priority, users)
    const tables = parseTables(numbers)
    const allocate = allocation(entryTeamUsers, tables[3] + tables[4])

    return {
      users,
      numbers,
      tables,
      allocate,
    }
  }, [entryTeamUsers])

  const getCopyText = () => {
    if (!numbers) throw new Error(`${users} 全員参加できる卓数の作成ができませんでした。`)

    return `------------------------------
参加総数: ${users}人
優先作成卓: ${priority}麻
------------------------------
四麻人数: ${numbers[4]}人
三麻人数: ${numbers[3]}人
------------------------------
四麻卓: 1 ~ ${tables[4]}卓
三麻卓: ${tables[4] + 1} ~ ${tables[4] + tables[3]}卓
------------------------------
${allocate.map(team => `
------------------------------
${teamsById[team.id].name}チーム
ダイス: ${teamsById[team.id].dice}
卓: ${team.tables.join(', ')}
------------------------------`).join('\n')}`
  }

  return {
    users,
    tables,
    getCopyText,
  }
}

export default useMaker
