const sizes = resizer => {
  const baseunit = { unit: '12vw' }
  if (resizer.portrait && resizer.xs) {
    baseunit['unit'] = '13vw'
  }
  if (!resizer.portrait && resizer.xs) {
    baseunit['unit'] = '15vh'
  }
  if (!resizer.portrait && resizer.xl) {
    baseunit['unit'] = '15vh'
  }
  if (resizer.portrait && resizer.xl) {
    baseunit['unit'] = '15vw'
  }
  return baseunit.unit
}
export default sizes
