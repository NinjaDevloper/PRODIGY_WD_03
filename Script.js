document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function handleCellClick(index) {
        if (!gameOver && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            updateBoard();
            const winner = checkWinner();
            if (winner) {
                alert(`Player ${winner} wins!`);
                gameOver = true;
            } else if (checkDraw()) {
                alert('It\'s a draw!');
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function updateBoard() {
        board.innerHTML = '';
        gameBoard.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = value;
            cell.classList.add(`player-${value.toLowerCase()}`);
            cell.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cell);
        });
    }

    updateBoard();
});