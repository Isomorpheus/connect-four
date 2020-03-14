import sizes from '../BoardSizes'

describe('Base units for grid', () => {
  describe('Check base unit at breakpoint', () => {
    it('return size of 12w at "sm" in portait mode ', () => {
      const resizer = sizes({
        width: 663,
        height: 1343,
        touch: false,
        portrait: true,
        landscape: false,
        breakpointsOrder: ['xs', 'sm', 'md', 'lg', 'xl'],
        breakpoint: 'sm',
        xs: true,
        sm: true,
        md: false,
        lg: false,
        xl: false
      })
      expect(resizer).toBe('13vw')
    })
    it('return size of 15vh at "sm" if not in portait mode ', () => {
      const resizer = sizes({
        width: 663,
        height: 1343,
        touch: false,
        portrait: false,
        landscape: false,
        breakpointsOrder: ['xs', 'sm', 'md', 'lg', 'xl'],
        breakpoint: 'sm',
        xs: true,
        sm: true,
        md: false,
        lg: false,
        xl: false
      })
      expect(resizer).toBe('15vh')
    })

    it('return size of 15w at "xl" if not in portait mode ', () => {
      const resizer = sizes({
        width: 1200,
        height: 900,
        touch: false,
        portrait: false,
        landscape: false,
        breakpointsOrder: ['xs', 'sm', 'md', 'lg', 'xl'],
        breakpoint: 'sm',
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true
      })
      expect(resizer).toBe('15vh')
    })
  })
})
