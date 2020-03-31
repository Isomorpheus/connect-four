import { transpose } from '@/services/utils'
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
export const verticalPatternMatching = (row: string): number | string => {
  return firstNumber(checkRowOnPattern(row)('1110')())
}

export const strategy = (data: string): { column: number } => {
  const { board } = JSON.parse(data).data

  //vertical check
  const transPosedBoard = transpose(board)

  const verticalResult: number[] = transPosedBoard.map((row: number[]) =>
    verticalPatternMatching(row.join(''))
  )
  
  const verticalCol = verticalResult.findIndex(r => r > -1) ?? -1

  const result: number[] = board.map((row: number[]) =>
    patternMatching(row.join(''))
  )
  const random: number = Math.floor(Math.random() * 7)
  const horizontalCol = result.find(r => r > -1) ?? random

  const column = verticalCol > -1 ? verticalCol : horizontalCol

  const postdata: { column: number } = { column: column }
  return { ...postdata }
}
