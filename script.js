const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const playerXScore = document.getElementById('playerXScore');
const playerOScore = document.getElementById('playerOScore');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let xScore = 0;
let oScore = 0;
let isGameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinningCells(pattern);
            updateScore();
            isGameActive = false;  // Lock the game once a winner is found
            return true;
        }
    }

    if (!gameBoard.includes('')) {
        alert('It\'s a draw!');
        isGameActive = false;  // Lock the game in case of a draw
        return true;
    }
    return false;
}

function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function updateScore() {
    if (currentPlayer === 'X') {
        xScore++;
        playerXScore.textContent = xScore;
    } else {
        oScore++;
        playerOScore.textContent = oScore;
    }
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] || !isGameActive) return;  // Ignore clicks if game is over

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        return;  // Stop further moves if the game has a winner or draw
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Change player
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];  // Reset the game board
    isGameActive = true;  // Enable game for new round
    currentPlayer = 'X';  // Start with Player X

    cells.forEach(cell => {
        cell.textContent = '';  // Clear all cell texts
        cell.classList.remove('winning-cell');  // Remove any winning styles
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
 
