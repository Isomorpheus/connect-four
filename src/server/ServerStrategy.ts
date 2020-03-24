import { pipe, transpose } from '@/services/utils'
import {
  checkConnections,
  transformRow
} from '@/services/SmartCheckWinStrategy'
export const checkRowOnPattern = (row: string) => (pattern: string) => (
  position: string = 'before'
): number | string => {
  const placer: number = position === 'last' ? pattern.length - 1 : 0
  const column = row.indexOf(pattern) + placer
  const res = row.indexOf(pattern) > -1 ? column : 'none'
  // console.log('play',pattern, res );
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
    // checkRowOnPattern(row)('02')(),
    // checkRowOnPattern(row)('20')('last')
  )

  return col !== 'none' ? col : 'none'
}
const checkV = (rows: number[][]) => {
  console.log('row', rows)

  const boardForPlayer = (p: number = 1) =>
    rows.map(row => transformRow(p)(row))
  const twoConnections = checkConnections('cc')
  const testOnWinner = (rows: number[][]) => rows.findIndex(twoConnections)
  const checkVerticals = pipe(boardForPlayer, transpose, testOnWinner)
  return checkVerticals(1) //?
}

export const strategy = (data: string): { column: number } => {
  const { board } = JSON.parse(data).data

  const vrt = transpose(board)
    .reverse()
    .map((row: number[]) => patternMatching(row.join('')))
  let colContainer = 0
  if (checkV(board)) {
    colContainer = vrt.find((r: number) => r > -1)
  } else {
    const result: number[] = board.map((row: number[]) =>
      patternMatching(row.join(''))
    )
    const random: number = Math.floor(Math.random() * 7)
    colContainer = result.find(r => r > -1) ?? random
  }

  const postdata: { column: number } = { column: colContainer }
  return { ...postdata }
}
