export type Weight = 3 | 4
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
export const divisionNumbers = (weight: Weight, numbers: number) => {
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
  const index = Number.isInteger(centerIndex) && weight === 3
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
 * 三麻と四麻の値を反転させる
 * @param weight 
 * @returns Weight
 */
export const getInversion = (weight: Weight) => weight === 3 ? 4 : 3
