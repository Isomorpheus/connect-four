export type data = {
  board: number[][]
}

export const strategy = (data: data):{column: number}  => {
  const { board } = data
  console.log('data', board)
  // check player 1 on horizontal combinations

  return { column: 2 }
}
