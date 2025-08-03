let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const playerDisplay = document.getElementById("player");
const resetButton = document.getElementById("reset");

function handleClick(event) {
  const index = event.target.getAttribute("data-index");
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add("taken");

  if (checkWin()) {
    playerDisplay.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    playerDisplay.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.textContent = `Player: ${currentPlayer}`;
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board.fill("");
  gameActive = true;
  currentPlayer = "X";
  playerDisplay.textContent = "Player: X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
