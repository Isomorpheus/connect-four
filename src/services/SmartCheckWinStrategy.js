import { transpose } from '../services/utils'

const strategy = rows => {
  // transforms row for generic check per player
  const transformRow = player => trRow =>
    trRow.map(p => (p === player ? 'x' : '-'))

  // player boards
  const boardForPlayer1 = rows.map(row => transformRow(1)(row))
  const boardForPlayer2 = rows.map(row => transformRow(2)(row))

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
    const diaOne = diagonals(matrix).slice(0, 4)
    const diaTwo = diagonals(transpose(matrix)).slice(1, 3)
    return diaOne.concat(diaTwo)
  }

  // results
  function results() {
    if (testOnWinner(boardForPlayer1) || testOnWinner(boardForPlayer2)) {
      return 'horizontal'
    }
    // transpose columns to rows for checking on vertical winners
    if (
      testOnWinner(transpose(boardForPlayer1)) ||
      testOnWinner(transpose(boardForPlayer2))
    ) {
      return 'vertical'
    }
    if (
      testOnWinner(allDiagonals(boardForPlayer1)) ||
      testOnWinner(allDiagonals(boardForPlayer2))
    ) {
      return 'diagonal asc'
    }
    if (
      testOnWinner(allDiagonals(boardForPlayer1.reverse())) ||
      testOnWinner(allDiagonals(boardForPlayer2.reverse()))
    ) {
      return 'diagonal desc'
    }
    return 'none'
  }
  console.log('results', results())
  switch (results()) {
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
