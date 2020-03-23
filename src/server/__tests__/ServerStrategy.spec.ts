import {
  strategy,
  checkRowOnPattern,
  firstNumber,
  patternMatching
} from '../ServerStrategy'
describe('Oponent strategy works', () => {
  it('outcome', () => {
    const combinations = JSON.stringify({
      data: {
        board: [
          [0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 2],
          [2, 1, 1, 1, 0, 2, 1],
          [0, 2, 2, 2, 1, 0, 1],
          [0, 0, 2, 0, 0, 0, 1],
          [0, 0, 0, 1, 1, 1, 0]
        ]
      }
    })
    expect(strategy(combinations)).toEqual({ column: 2 })
  })
})

describe('helpers', () => {
  it('checkRowOnPattern', () => {
    expect(checkRowOnPattern('0110202')('011')('isIndex')).toBe(0)
  })

  it('checkRowOnPattern', () => {
    expect(checkRowOnPattern('20110012')('011')()).toBe(1)
  })

  it('checkRowOnPattern', () => {
    expect(checkRowOnPattern('211002')('110')('last')).toBe(3)
  })

  it('checkRowOnPattern', () => {
    expect(checkRowOnPattern('0110012')('011')()).toBe(0)
  })

  it('checkRowOnPattern', () => {
    expect(checkRowOnPattern('012012')('011')()).toBe('none')
  })

  it('firstNumber', () => {
    expect(firstNumber('none', 'none', 4, 2, 5)).toBe(4)
  })
  it('firstNumber', () => {
    expect(firstNumber('none', 'none', 'none', 'none', 'none', 'none')).toBe(
      'none'
    )
  })
})

describe('patternMatching', () => {
  test('sample "0110202" should return 0', () => {
    const sample = '0110202'
    expect(patternMatching(sample)).toBe(0) //?.
  })

  test('sample "1102020" should return 2', () => {
    expect(patternMatching('211002')).toBe(3) //?.
  })

  test('sample "1102020" should return 2', () => {
    expect(patternMatching('1121021')).toBe(4) //?.
  })
  test('sample "1121011" should return 5', () => {
    expect(patternMatching('1121011')).toBe(4) //?.
  })

  test('sample "1112221" should return "none"', () => {
    expect(patternMatching('1122121')).toBe('none')
  })
})
