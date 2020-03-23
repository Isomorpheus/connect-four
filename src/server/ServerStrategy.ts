export type data = {
  board: number[][]
}

export const checkRowOnPattern = (row: string) => (pattern: string)  => (place: string = 'before') : number | string => {
  const placer:number = place === 'last' ? pattern.length - 1 : 0 
  const column =  row.indexOf(pattern) + placer
  return row.indexOf(pattern) > -1 ? column : 'none'
}

export const firstNumber = (...fns: (number | string)[]): number | string => fns.find(f => typeof f === 'number' ) ?? 'none'

export const patternMatching = (row: string): number | string => {

  const col = firstNumber(
    checkRowOnPattern(row)('0111')(),
    checkRowOnPattern(row)('1110')('last'), 
    checkRowOnPattern(row)('011')(), 
    checkRowOnPattern(row)('110')('last'),
    checkRowOnPattern(row)('01')(),
    checkRowOnPattern(row)('10')('last'),
    checkRowOnPattern(row)('02')(),
    checkRowOnPattern(row)('20')('last')
  )

  return col !== 'none' ? col : 'none'
}

export const strategy = (data: string): { column: number } => {
  const { board } = JSON.parse(data).data
  const res: number[] = board
    .map((row: number[]) => patternMatching(row.join('')))
  const random: number = Math.floor(Math.random() * 7)
  const vconst: number = res.find(r => r > -1) ?? random
  const column: { column: number } = { column: vconst }
  return { ...column }
}
