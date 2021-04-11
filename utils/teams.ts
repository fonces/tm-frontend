import { Team } from '@/pages/api/team/GET'

/**
 * 分けた卓の番号をチームごとに返却する
 * @param teams チームリスト
 * @param tables テーブル情報
 * @returns チームIDとテーブル番号の配列
 */
export const allocation = (teams: Team[], tables: number) => {
  const repeat = numberRepeat(tables)
  return teams
    .sort((a, b) => a.dice - b.dice)
    .map(team => ({
      id: team.id,
      tables: [...new Array(team.users.length)]
        .map(repeat)
        .sort((a, b) => a - b),
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
