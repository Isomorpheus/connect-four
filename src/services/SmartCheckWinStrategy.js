const strategy = rows => {
  // set players
  const players = [1, 2]
  // transformed row for generic check
  const transformedRow = player => trRow =>
    trRow.map(p => (p === player ? 'x' : '-'))

  const boardForPlayer1 = rows.map(row => transformedRow(1)(row))

  const boardForPlayer2 = rows.map(row => transformedRow(2)(row))

  // check for n connections
  const checkConnections = n => arr =>
    arr.reduce((acc, curr, i, array) => {
      const item = array[i + 1]
      if (item === 'x' && curr === 'x') {
        acc = acc + 1
      }
      return acc
    }, 0) >= n

  // partial for 3 or more connections
  const threeConnections = checkConnections(3)

  // check for horizontal winners
  const testPlayers = rows => (rows.some(threeConnections) ? 'horizontal' : '')
  let result = testPlayers(boardForPlayer1) || testPlayers(boardForPlayer2)

  // check for vertical winners
  // transpose cols to rows
  const transpose = array => array[0].map((col, i) => array.map(row => row[i]))
  const vertical = rows => (rows.some(threeConnections) ? 'vertical' : '')

  result =
    vertical(transpose(boardForPlayer1)) || vertical(transpose(boardForPlayer2))

  // check for diagonal winners descending

  const diagonals = matrix =>
    matrix[0].map((col, i) =>
      matrix.map((row, ri) => (row[i + ri] ? row[i + ri] : '-'))
    )

  const comb = matrix => {
    const diaOne = diagonals(matrix).slice(0, 4)
    const diaTwo = diagonals(transpose(matrix)).slice(1, 3)
    return diaOne.concat(diaTwo)
  }

  const descDiagonals = matrix => comb(matrix)
  const diagonal = rows => (rows.some(threeConnections) ? 'diagonal desc' : '')
  result =
    diagonal(descDiagonals(boardForPlayer1)) ||
    diagonal(descDiagonals(boardForPlayer2))

  const ascDiagonals = matrix => comb(matrix.reverse())
  const diagonalAsc = rows =>
    rows.some(threeConnections) ? 'diagonal asc' : ''
  result =
    diagonalAsc(ascDiagonals(boardForPlayer1)) ||
    diagonalAsc(ascDiagonals(boardForPlayer2))

  console.log(diagonalAsc(ascDiagonals(boardForPlayer1)))

  switch (result) {
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
