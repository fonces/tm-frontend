import { TeamUser } from '@/hooks/teamUsers'
import { Priority } from '@/stores/settings/types'

export type Match = {
  4: number
  3: number
}
export type Table = {
  4: number
  3: number
}

/**
 * 総人数から4麻・3麻の人数を算出する
 * @param weight 4麻・3麻どちらを多めに作成するか
 * @param numbers 総人数
 * @returns Match型のObject
 */
export const divisionNumbers = (priority: Priority, numbers: number) => {
  const matched: Match[] = []
  for (let fourBase = 0; fourBase <= numbers; fourBase += 4) {
    const remainderFour = Math.round(fourBase / 4)
    const divisionFour = fourBase % 4
    const divisionThree = (numbers - remainderFour) % 3
    if (divisionFour === 0 && divisionThree === 0) {
      matched.push({
        4: fourBase,
        3: numbers - fourBase,
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
 * @param teams チームリスト
 * @param tables テーブル情報
 * @returns チームIDとテーブル番号の配列
 */
export const allocation = (teams: TeamUser[], matched: Match) => {
  const totalTable = matched[4] + matched[3]
  const repeat = numberRepeat(totalTable)
  return teams
    .sort((a, b) => a.dice - b.dice)
    .map(({ id, users }) => ({
      id,
      tables: [...new Array(users.length)]
        .map(repeat)
        .sort((a, b) => a - b),
    }))
    .map(({ tables, ...rest }) => ({
      ...rest,
      tables: {
        4: tables.filter(table => table <= matched[4]),
        3: tables.filter(table => matched[4] < table && table <= totalTable),
      }
    }))
}

/**
 * 数値をリピートする関数を作成する
 * @param max 最大値
 * @returns 数値
 */
const numberRepeat = (max: number) => {
  const loop = (function * () {
    let index = 0
    while (true) {
      index++
      yield index
      if (max === index) {
        index = 0
      }
    }
  })()
  return () => loop.next().value
}
