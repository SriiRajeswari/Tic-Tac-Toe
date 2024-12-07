const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        scores[currentPlayer]++;
        updateScores();
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScores() {
    scoreXDisplay.textContent = scores.X;
    scoreODisplay.textContent = scores.O;
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);