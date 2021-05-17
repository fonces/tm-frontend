import { useMemo } from 'react'

import { PRIORITY_KANJI_MAP } from '@/helpers/consts'
import useTeams from '@/stores/teams'
import useSettings from '@/stores/settings'
import { divisionNumbers, parseTables, allocation } from '@/utils/table'

const separator = '------------------------------'

const useMaker = () => {
  const { sortedTeams, byId: teamsById } = useTeams()
  const { priority } = useSettings()

  const {
    users,
    numbers,
    isCreatable,
    tables,
    allocate,
  } = useMemo(() => {
    const users = sortedTeams.reduce((acc, { users }) => acc + users, 0)
    const numbers = divisionNumbers(priority, users)
    const isCreatable = !!numbers

    if (!isCreatable) {
      return {
        users,
        numbers,
        isCreatable,
        tables: { 4: 0, 3: 0 },
        allocate: [],
      }
    }

    const tables = parseTables(numbers)
    const allocate = allocation(sortedTeams, tables)

    return {
      users,
      numbers,
      isCreatable,
      tables,
      allocate,
    }
  }, [sortedTeams])

  const getCopyText = () => {
    if (!isCreatable) throw new Error(`${users} 全員参加できる卓数の作成ができませんでした。`)
    return [
      separator,
      `参加総数: ${users}人`,
      `優先作成卓: ${PRIORITY_KANJI_MAP[priority]}麻`,
      separator,
      `四麻人数: ${numbers[4]}人`,
      `三麻人数: ${numbers[3]}人`,
      `${tables[4] > 0 ? `四麻卓: 1 ~ ${tables[4]}卓` : ''}`,
      `${tables[3] > 0 ? `三麻卓: ${tables[4] + 1} ~ ${tables[4] + tables[3]}卓` : ''}`,
      separator,
      ...allocate.map(team => [
          `${teamsById[team.id].name}チーム`,
          `ダイス: ${teamsById[team.id].dice}`,
          team.tables[4].length && `四麻卓: ${team.tables[4].join(', ')}`,
          team.tables[3].length && `三麻卓: ${team.tables[3].join(', ')}`,
          separator,
      ])
        .flat()
        .filter(Boolean),
    ]
      .filter(Boolean)
      .join('\n')
  }

  return {
    priority,
    users,
    numbers,
    tables,
    allocate,
    isCreatable,
    getCopyText,
  }
}

export default useMaker
