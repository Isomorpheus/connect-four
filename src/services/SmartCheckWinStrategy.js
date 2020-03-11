import { transpose } from '../services/utils'

const strategy = rows => {
  // transforms row for generic check per player
  const transformRow = player => trRow =>
    trRow.map(p => (p === player ? 'x' : '-'))

  // player boards
  const boardForPlayer1 = rows.map(row => transformRow(1)(row))
  const boardForPlayer2 = rows.map(row => transformRow(2)(row))

  const boardForPlayer = p => rows.map(row => transformRow(p)(row))

  // generic check for n or more connections
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
    const diaOne = diagonals(matrix).slice(0, 4)
    const diaTwo = diagonals(transpose(matrix)).slice(1, 3)
    return diaOne.concat(diaTwo)
  }

  // check for diagonal winners descending
  const descDiagonals = matrix => allDiagonals(matrix)
  // check for diagonal winners ascending
  const ascDiagonals = matrix => allDiagonals(matrix.reverse())

  // result
  function result() {
    if (testOnWinner(boardForPlayer(1)) || testOnWinner(boardForPlayer(2))) {
      return 'horizontal'
    }
    // transpose columns to rows
    if (
      testOnWinner(transpose(boardForPlayer1)) ||
      testOnWinner(transpose(boardForPlayer2))
    ) {
      return 'vertical'
    }
    if (
      testOnWinner(descDiagonals(boardForPlayer1)) ||
      testOnWinner(descDiagonals(boardForPlayer2))
    ) {
      return 'diagonal desc'
    }
    if (
      testOnWinner(ascDiagonals(boardForPlayer1)) ||
      testOnWinner(ascDiagonals(boardForPlayer2))
    ) {
      return 'diagonal asc'
    }
  }
  console.log(result())
  switch (result()) {
    case 'horizontal':
      return 2
    case 'vertical':
      return 1
    case 'diagonal asc':
      return 2
    case 'diagonal desc':
      return 1
    default:
      return 0
  }
}

export default strategy
