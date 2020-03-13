import strategy from '../SmartCheckWinStrategy'

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
