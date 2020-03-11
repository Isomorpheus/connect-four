export const transpose = array =>
  array[0].map((col, i) => array.map(row => row[i]))

export const replaceAt = (array, index, value) => {
  const newArray = array.slice(0)
  newArray[index] = value
  return newArray
}
