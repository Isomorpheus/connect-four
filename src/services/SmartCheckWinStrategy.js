import { transpose, pipe, arrayReverse } from '../services/utils'

// transforms a row in the matrix, for generic check per player
export const transformRow = player => trRow =>
  trRow.map(p => (p === player ? 'x' : '-'))

// generic predicate to check for n or more connections
export const checkConnections = n => inputArray =>
  inputArray
    .reduce(
      (connections, curr, i, array) => {
        const item = i < array.length ? array[i + 1] : '-'
        if (item === 'x' && curr === 'x') {
          connections.push('c')
        } else {
          connections.push('-')
        }
        return connections
      },
      [0]
    )
    .join('')
    .includes(n)

const strategyWrapper = players => rows => {
  // playerboard per player
  const boardForPlayer = p => rows.map(row => transformRow(p)(row))

  // partial function for specific testing on 3 or more connections
  const threeConnections = checkConnections('ccc')

  // check for winners: if there are 3 or more connections
  const testOnWinner = rows => rows.some(threeConnections)

  // diagonals for testing on winners
  const diagonals = matrix =>
    matrix[0].map((col, i) =>
      matrix.map((row, ri) => (row[i + ri] ? row[i + ri] : '-'))
    )

  const allDiagonals = matrix => {
    const diagonalsStartingInTopRow = diagonals(matrix).slice(0, 4)
    const diagonalsStartingAtFirstColumn = diagonals(transpose(matrix)).slice(
      1,
      3
    )
    return diagonalsStartingInTopRow.concat(diagonalsStartingAtFirstColumn)
  }

  // test for winner functions
  const checkHorizontals = pipe(boardForPlayer, testOnWinner)
  const checkVerticals = pipe(boardForPlayer, transpose, testOnWinner)
  const checkDiagonalsDesc = pipe(boardForPlayer, allDiagonals, testOnWinner)
  const checkDiagonalsAsc = pipe(
    boardForPlayer,
    arrayReverse,
    allDiagonals,
    testOnWinner
  )

  // boardchecker for winning combinations per player
  function playerResults(player) {
    if (checkHorizontals(player)) {
      return player
    }

    if (checkVerticals(player)) {
      return player
    }

    if (checkDiagonalsDesc(player)) {
      return player
    }

    if (checkDiagonalsAsc(player)) {
      return player
    }
    return 'none'
  }

  const winner = players =>
    players.map(p => playerResults(p)).find(r => typeof r === 'number')

  return winner(players) ?? 0
}
// strategyWrapper is a partial with array of players as an argument
// strategy can be a pure function with rows as an single argument
const strategy = strategyWrapper([1, 2])
export default strategy
