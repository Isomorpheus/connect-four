export const transpose = array =>
  array[0].map((col, i) => array.map(row => row[i]))

export const replaceAt = (array, index, value) => {
  const newArray = array.slice(0)
  newArray[index] = value
  return newArray
}

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
export const reverser = array => array.reverse()
