export const checkRowOnPattern = (row: string) => (pattern: string) => (
  position: string = 'before'
): number | string => {
  const placer: number = position === 'last' ? pattern.length - 1 : 0
  const column = row.indexOf(pattern) + placer
  const res = row.indexOf(pattern) > -1 ? column : 'none'
  return res
}

export const firstNumber = (...fns: (number | string)[]): number | string =>
  fns.find(f => typeof f === 'number') ?? 'none'

export const patternMatching = (row: string): number | string => {
  const col = firstNumber(
    checkRowOnPattern(row)('0111')(),
    checkRowOnPattern(row)('1110')('last'),
    checkRowOnPattern(row)('011')(),
    checkRowOnPattern(row)('110')('last'),
    checkRowOnPattern(row)('01')(),
    checkRowOnPattern(row)('10')('last')
  )

  return col !== 'none' ? col : 'none'
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
