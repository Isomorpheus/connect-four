import { strategy, data } from '../ServerStrategy'
describe('Oponent strategy works', () => {
  it('outcome', () => {
    const combinations: data = {
      board: [
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 2],
        [2, 1, 1, 1, 0, 2, 1],
        [0, 2, 2, 2, 1, 0, 1],
        [0, 0, 2, 0, 0, 0, 1],
        [0, 0, 0, 1, 1, 1, 0]
      ]
    }
    expect(strategy(combinations)).toEqual({ column: 2 })
  })

})
