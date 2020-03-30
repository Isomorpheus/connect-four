export const checkRowOnPattern = (row: string) => (pattern: string) => (
  position: string = 'before'
): number | string => {
  const placer: number = position === 'last' ? pattern.length - 1 : 0
  const column = row.indexOf(pattern) + placer
  return row.indexOf(pattern) > -1 ? column : 'none'

}

export const firstNumber = (...arr: (number | string)[]): number | string =>
  arr.find(f => typeof f === 'number') ?? 'none'
  
export const patternMatching = (row: string): number | string => {
  return firstNumber(
    checkRowOnPattern(row)('0111')(),
    checkRowOnPattern(row)('1110')('last'),
    checkRowOnPattern(row)('011')(),
    checkRowOnPattern(row)('110')('last'),
    checkRowOnPattern(row)('01')(),
    checkRowOnPattern(row)('10')('last')
  )
}

export const strategy = (data: string): { column: number } => {
  const { board } = JSON.parse(data).data

  const result: number[] = board.map((row: number[]) =>
    patternMatching(row.join(''))
  )
  const random: number = Math.floor(Math.random() * 7)
  const column = result.find(r => r > -1) ?? random

  const postdata: { column: number } = { column: column }
  return { ...postdata }
}
