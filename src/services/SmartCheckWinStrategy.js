import { transpose } from '../services/utils'

const players = [1, 2]

const strategy = rows => {
  // transforms a row in the matrix, for generic check per player
  const transformRow = player => trRow =>
    trRow.map(p => (p === player ? 'x' : '-'))

  // playerboard per player
  const boardForPlayer = p => rows.map(row => transformRow(p)(row))

  // generic predicate to check for n or more connections
  const checkConnections = n => inputArray =>
    inputArray.reduce((connections, curr, i, array) => {
      const item = array[i + 1]
      if (item === 'x' && curr === 'x') {
        connections = connections + 1
      }
      return connections
    }, 0) >= n

  // partial function for specific testing on 3 or more connections
  const threeConnections = checkConnections(3)

  // check for winners: if there are 3 or more connections
  const testOnWinner = rows => rows.some(threeConnections)

  // diagonals for testing on winners
  const diagonals = matrix =>
    matrix[0].map((col, i) =>
      matrix.map((row, ri) => (row[i + ri] ? row[i + ri] : '-'))
    )

  const allDiagonals = matrix => {
    const diagonalsStartingInTopRow = diagonals(matrix).slice(0, 4)
    const diaonalsStartingAtFirstColumn = diagonals(transpose(matrix)).slice(
      1,
      3
    )
    return diagonalsStartingInTopRow.concat(diaonalsStartingAtFirstColumn)
  }

  // boardchecker for winning combinations per player
  function playerResults(player) {
    // check on horizontals
    if (testOnWinner(boardForPlayer(player))) {
      return player
    }
    // transpose columns to rows for checking on vertical winners
    if (testOnWinner(transpose(boardForPlayer(player)))) {
      return player
    }
    // check for diagonal winners (desecending)
    if (testOnWinner(allDiagonals(boardForPlayer(player)))) {
      return player
    }
    // check for diagonal winners (asecending)
    if (testOnWinner(allDiagonals(boardForPlayer(player).reverse()))) {
      return player
    }
    return 'none'
  }

  const winner = players
    .map(n => playerResults(n))
    .find(r => typeof r === 'number')
  return winner ? winner : 0
}

export default strategy
