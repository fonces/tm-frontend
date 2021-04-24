/**
 * 数値をリピートする関数を作成する
 * @param max 最大値
 * @returns 数値
 */
export const generateRepeater = (max: number) => {
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
