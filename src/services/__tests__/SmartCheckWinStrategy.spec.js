import strategy, { checkConnections } from '../SmartCheckWinStrategy'
// import { checkConnectionsForPlayerOne } from '../../server/ServerStrategy'

/**
 * # Disclaimer
 * These tests rely on cherry picked situations. Not all edge cases
 * might be covered. Proceed with caution.
 */

describe('Win strategies', () => {
  describe('smart check', () => {
    it('returns 0 when there are no winners yet', () => {
      const winner = strategy([
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 2],
        [2, 1, 1, 1, 0, 2, 1],
        [0, 2, 2, 2, 1, 0, 1],
        [0, 0, 2, 0, 0, 0, 1],
        [0, 0, 0, 1, 1, 1, 0]
      ])
      expect(winner).toBe(0)
    })

    it('returns 0 when there are no winners yet', () => {
      const winner = strategy([
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 2],
        [2, 1, 1, 1, 0, 2, 1],
        [0, 2, 2, 2, 1, 0, 1],
        [0, 0, 2, 0, 0, 0, 1],
        [2, 2, 2, 0, 0, 2, 2]
      ])
      expect(winner).toBe(0)
    })

    it('can find a horizontal winner', () => {
      const winner = strategy([
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0],
        [0, 2, 2, 2, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0]
      ])
      expect(winner).toBe(2)
    })

    it('can find a vertical winner', () => {
      const winner = strategy([
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0],
        [0, 2, 2, 1, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0]
      ])
      expect(winner).toBe(1)
    })

    it('can find a diagonal winner (top to right)', () => {
      const winner = strategy([
        [0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0],
        [0, 2, 1, 2, 2, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 1, 0]
      ])
      expect(winner).toBe(1)
    })

    it('can find a diagonal winner (bottom to right)', () => {
      const winner = strategy([
        [0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 2, 1, 1, 0],
        [0, 0, 2, 1, 0, 0, 0],
        [0, 2, 1, 2, 2, 0, 0],
        [2, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 1, 0]
      ])
      expect(winner).toBe(2)
    })
  })
})

describe('individual functions', () => {
  test('checkConnections', () => {
    const sampleArray = ['-', 'x', 'x', '-', 'x', '-', 'x']
    const atLeastTwo = 'c'
    expect(checkConnections(atLeastTwo)(sampleArray)).toBe(true) //?
  })

  test('checkConnections, with no connections', () => {
    const sampleArray = ['-', 'x', '-', 'x', '-', 'x', '-']
    const atLeastTwo = 'c'
    expect(checkConnections(atLeastTwo)(sampleArray)).toBe(false) //?
  })
})

/// describe('getIndexBeforeOrAfter', () => {
///   test('checkConnectionsForPlayerOne', () => {
///     const sampleArray = [0, 1, 2, 0, 1, 1, 0]
///     const atLeastTwo = 1
///     expect(checkConnectionsForPlayerOne(atLeastTwo)(sampleArray)).toBe(true) //?
///   })
/// })
