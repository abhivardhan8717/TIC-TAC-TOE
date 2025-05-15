const startBtn = document.getElementById("start-btn");
const gameBoard = document.getElementById("game");
const cells = document.querySelectorAll("[data-cell]");
const messageEl = document.getElementById("message");
const xScoreEl = document.getElementById("x-score");
const oScoreEl = document.getElementById("o-score");

let xTurn = true;
let board = ["", "", "", "", "", "", "", "", ""];
let xScore = 0;
let oScore = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6]  // diagonals
];

startBtn.addEventListener("click", startGame);

function startGame() {
  board.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
    cell.addEventListener("click", handleClick, { once: true });
  });
  gameBoard.classList.remove("hidden");
  messageEl.textContent = "";
  xTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const index = [...cells].indexOf(cell);
  const currentPlayer = xTurn ? "X" : "O";

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    endGame(false, currentPlayer);
  } else if (board.every(cell => cell !== "")) {
    endGame(true);
  } else {
    xTurn = !xTurn;
  }
}

function checkWin(player) {
  return winningCombinations.some(combo => {
    return combo.every(index => board[index] === player);
  });
}

function endGame(draw, winner = "") {
  if (draw) {
    messageEl.textContent = "It's a draw!";
  } else {
    messageEl.textContent = `${winner} wins!`;
    if (winner === "X") {
      xScore++;
      xScoreEl.textContent = xScore;
    } else {
      oScore++;
      oScoreEl.textContent = oScore;
    }
  }

  cells.forEach(cell => {
    cell.removeEventListener("click", handleClick);
  });
}
