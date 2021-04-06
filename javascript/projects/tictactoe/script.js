// Declare initial variables and winning combinations
let player1 = 'X'
let player2 = 'O'
let winCombo = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]
let origBoard;
let currPlayer;
let board = document.querySelectorAll('.cell')
// Define play again which would - reset board
startGame();
function startGame() {
    currPlayer = player1;
    // set everything back to default
    origBoard = Array.from(Array(9).keys())
    console.log(origBoard)
    board.forEach((cell) => {
        cell.innerText = "";
        cell.style.removeProperty('background-color');
        cell.addEventListener('click', turnClick)
    })
}

function turnClick(e) {
    turn(e.target.id, currPlayer)
    if (currPlayer === player1) {
        currPlayer = player2
    } else {
        currPlayer = player1
    }
}

function turn(cellId, player) {
    if (typeof origBoard[cellId] === 'number') {
        origBoard[cellId] = player
        cell = document.getElementById(cellId)
        cell.innerText = player

        let gameWon = checkWin(origBoard, player)
        let gameTie = checkTie(origBoard)
        console.log(gameWon)
        if (gameWon) endGame(gameWon)
        if (gameTie) displayResult('Tie Game')
    }
}

// [0: x; 1:x, 2: x,]

function checkWin(board, player) {
    console.log(board)
    let plays = board.reduce((acc, currValue, index) =>
        (currValue === player) ? acc.concat(index) : acc
        , [])
    let gameWon = null
    for (let [index, win] of winCombo.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            console.log(gameWon)
            break;
        }
    }
    return gameWon;
}


function endGame(gameWon) {
    for (let index of winCombo[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == player1 ? 'blue' : 'red';
    }

    for (let i = 0; i < board.length; i++) {
        board[i].removeEventListener('click', turnClick)
    }
}

function checkTie(board) {
    const tieBoard = board.filter(val => typeof val === 'number')
    if (tieBoard.length === 0) {
        return true
    }
}

function displayResult(str) {
    alert(str)
}