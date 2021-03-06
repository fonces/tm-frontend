import { Team } from '@/stores/teams/types'
import { Priority } from '@/stores/settings/types'
import { generateRepeater } from '@/utils/number'

export type Match = {
  4: number
  3: number
}
export type Tables = {
  4: number
  3: number
}

/**
 * 総人数から4麻・3麻の人数を算出する
 * @param priority 4麻・3麻どちらを多めに作成するか
 * @param totalUsers 総人数
 * @returns Match型のObject
 */
export const divisionNumbers = (priority: Priority, totalUsers: number) => {
  const matched: Match[] = []
  for (let fourBase = 0; fourBase <= totalUsers; fourBase += 4) {
    const remainderFour = Math.round(fourBase / 4)
    const divisionFour = fourBase % 4
    const divisionThree = (totalUsers - remainderFour) % 3
    if (divisionFour === 0 && divisionThree === 0) {
      matched.push({
        4: fourBase,
        3: totalUsers - fourBase,
      })
    }
  }
  const centerIndex = matched.length / 2
  const index = Number.isInteger(centerIndex) && priority === 3
    ? centerIndex - 1
    : Math.floor(centerIndex)
  return matched[index]
}

/**
 * Match型のオブジェクトから卓数を算出する
 * @param matched Match型のオブジェクト
 * @returns 卓数
 */
export const parseTables = (matched: Match) => ({
  4: matched[4] / 4,
  3: matched[3] / 3,
})

/**
 * 分けた卓の番号をチームごとに返却する
 * @param sortedTeams ソートされたチームリスト
 * @param totalTables 卓数情報
 * @returns チームIDとテーブル番号の配列
 */
export const allocation = (sortedTeams: Team[], totalTables: Tables) => {
  const totalTable = totalTables[4] + totalTables[3]
  const repeater = generateRepeater(totalTable)
  return sortedTeams
    .map(({ id, users }) => ({
      id,
      tables: [...new Array(users)]
        .map(repeater)
        .sort((a, b) => a - b),
    }))
    .map(({ tables, ...rest }) => ({
      ...rest,
      tables: {
        4: tables.filter(table => table <= totalTables[4]),
        3: tables.filter(table => totalTables[4] < table && table <= totalTable),
      },
    }))
}
