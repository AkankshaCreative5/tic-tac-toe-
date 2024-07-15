const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const startGameBtn = document.getElementById('startGameBtn');
const modal = document.getElementById('winnerModal');
const span = document.getElementsByClassName('close')[0];
const winnerMessage = document.getElementById('winnerMessage');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');
const restartGameBtn = document.getElementById('restartGameBtn');
const newGameBtn = document.getElementById('newGameBtn');

let player1 = 'Player 1';
let player2 = 'Player 2';
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let resetTimeout;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        let winningPlayer = currentPlayer === 'X' ? player1 : player2;
        statusText.textContent = `${winningPlayer} Wins!`;
        winnerMessage.textContent = `Congratulations ${winningPlayer}! You Win!`;
        modal.style.display = 'block';
        winSound.play();  // Play the winning sound
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusText.textContent = `It's a Draw!`;
        winnerMessage.textContent = `It's a Draw! Try again!`;
        modal.style.display = 'block';
        drawSound.play();  // Play the draw sound
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    let nextPlayer = currentPlayer === 'X' ? player1 : player2;
    statusText.textContent = `${nextPlayer}'s Turn (${currentPlayer})`;
}

function restartGame() {
    clearTimeout(resetTimeout); // Clear the reset timeout
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    let nextPlayer = currentPlayer === 'X' ? player1 : player2;
    statusText.textContent = `${nextPlayer}'s Turn (${currentPlayer})`;
    cells.forEach(cell => (cell.textContent = ''));
    modal.style.display = 'none';
    startGameBtn.style.display = 'block'; // Show the Start Game button
}

function startGame() {
    player1 = player1Input.value || 'Player 1';
    player2 = player2Input.value || 'Player 2';
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `${player1}'s Turn (X)`;
    board.style.display = 'grid';
    startGameBtn.style.display = 'none'; // Hide the Start Game button
}

function returnToStart() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;
    
    board.style.display = 'none';
    cells.forEach(cell => (cell.textContent = ''));
    player1Input.value = '';
    player2Input.value = '';
    modal.style.display = 'none';
    startGameBtn.style.display = 'block'; // Show the Start Game button
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
startGameBtn.addEventListener('click', startGame);


span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

restartGameBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    restartGame();
});

newGameBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    returnToStart();
});
