const ITERATIONS = 1000

const PLAYER_HEALTH = 20
const WINNING_POSITION = 9

const GamePieceTypes = {
  PAWN: 'pawn',
  KNIGHT: 'knight',
  KING: 'king',
  QUEEN: 'queen',
  BISHOP: 'bishop',
  ROOK: 'rook'
}

const spinnerItems = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 2,
}

const drawItems = {
  1: GamePieceTypes.PAWN,
  2: GamePieceTypes.PAWN,
  3: GamePieceTypes.PAWN,
  4: GamePieceTypes.PAWN,
  5: GamePieceTypes.PAWN,
  6: GamePieceTypes.PAWN,
  7: GamePieceTypes.PAWN,
  8: GamePieceTypes.PAWN,
  9: GamePieceTypes.KNIGHT,
  10: GamePieceTypes.KNIGHT,
  11: GamePieceTypes.KING,
  12: GamePieceTypes.QUEEN,
  13: GamePieceTypes.BISHOP,
  14: GamePieceTypes.BISHOP,
  15: GamePieceTypes.ROOK,
  16: GamePieceTypes.ROOK
}

const rollDie = (sides) => Math.ceil(Math.random() * sides)

const pawnAction = (health) => health - 5
const knightAction = (health) => health
const kingAction = (health) => health
const queenAction = (health) => health
const bishopAction = (health) => rollDie(6) < 5 ? health - 5 : health
const rookAction = (health) => health - 3

const pieceActionMap = {
  [GamePieceTypes.PAWN]: pawnAction,
  [GamePieceTypes.KNIGHT]: knightAction,
  [GamePieceTypes.KING]: kingAction,
  [GamePieceTypes.QUEEN]: queenAction,
  [GamePieceTypes.BISHOP]: bishopAction,
  [GamePieceTypes.ROOK]: rookAction
}

const playGame = () => {
  let health = PLAYER_HEALTH, position = 0
  console.log(`Starting game. Health: ${PLAYER_HEALTH}, Position: ${position}`)

  do {
    const roll = rollDie(5)
    console.log(`You rolled ${roll}`)
    const moveCount = spinnerItems[roll]
    console.log(`Move ${moveCount}`)

    position += moveCount

    const chosenPiece = drawItems[rollDie(16)]
    console.log(`You chose piece ${chosenPiece}`)

    health = pieceActionMap[chosenPiece](health)
    console.log(`Your current health is ${health}. You are on position ${position}`)

  } while (health > 0 && position < WINNING_POSITION);

  if (health > 0 && position === WINNING_POSITION) {
    console.log(`You won!`)
    return 1
  }

  console.log(`Sorry you lost`)
  return 0
}

const run = () => {
  const results = Array.from({ length: ITERATIONS }).map(playGame)
  console.log(`Results:`, results)

  const winningCount = results.reduce((acc, v) => acc + v, 0)

  const probability = winningCount / results.length

  console.log(`Estimated probability of winning is ${probability}`)
}

run()
