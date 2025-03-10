class Tetromino {
constructor(shape, color) {
    this.pos_x = Math.floor(COLS / 2) - Math.floor(shape[0].length / 2);
    this.shape = shape;
    this.pos_y = 0;
    this.color = color;
}
rotate() {
    const rotatedShape = this.shape[0]
    .map((_, colIndex) => this.shape.map(row => row[colIndex]))
    .reverse();
    if (!checkCollision(rotatedShape, this.pos_x, this.pos_y)) {
    this.shape = rotatedShape;
    }
}
}

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange", "cyan"];
const SHAPES = [
[[1, 1, 1, 1]],
[[1, 1], [1, 1]],
[[0, 1, 0], [1, 1, 1]],
[[1, 1, 0], [0, 1, 1]],
[[0, 1, 1], [1, 1, 0]],
[[1, 1, 1], [1, 0, 0]],
[[1, 1, 1], [0, 0, 1]]
];

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const ROWS = 25, COLS = 12, BLOCK_SIZE = 25;
const BOARD = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;
canvas.style.border = "1px solid black";
canvas.style.backgroundColor = "rgba(8, 7, 45, 0.72)";

function drawgrid() {
ctx.beginPath();
for (let x = 0; x <= COLS; x++) {
    ctx.moveTo(x * BLOCK_SIZE, 0);
    ctx.lineTo(x * BLOCK_SIZE, ROWS * BLOCK_SIZE);
}
for (let y = 0; y <= ROWS; y++) {
    ctx.moveTo(0, y * BLOCK_SIZE);
    ctx.lineTo(COLS * BLOCK_SIZE, y * BLOCK_SIZE);
}
ctx.stroke();
}

let nextetetro = getNewTetromino();
let thetetro = getNewTetromino();
let score = 0;

function getNewTetromino() {
const random = Math.floor(Math.random() * SHAPES.length);
return new Tetromino(SHAPES[random], COLORS[random]);
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawgrid();

// Draw the board (merged tetrominoes)
BOARD.forEach((row, y) => row.forEach((cell, x) => {
    if (cell) {
    ctx.fillStyle = cell;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
}));

// Draw the active tetromino
thetetro.shape.forEach((row, dy) => row.forEach((cell, dx) => {
    if (cell) {
    ctx.fillStyle = thetetro.color;
    ctx.fillRect((thetetro.pos_x + dx) * BLOCK_SIZE, (thetetro.pos_y + dy) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.strokeRect((thetetro.pos_x + dx) * BLOCK_SIZE, (thetetro.pos_y + dy) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
}));

drawNextTetromino();
}

const nextCanvas = document.getElementById('next-tetro');
const nextCtx = nextCanvas.getContext('2d');
nextCanvas.style.border = "1px solid black";
nextCanvas.width = 4 * BLOCK_SIZE;
nextCanvas.height = 4 * BLOCK_SIZE;

function drawNextTetromino() {
nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

const shape = nextetetro.shape;
const offsetX = Math.floor((4 - shape[0].length) / 2);
const offsetY = Math.floor((4 - shape.length) / 2);

shape.forEach((row, y) => row.forEach((cell, x) => {
    if (cell) {
    nextCtx.fillStyle = nextetetro.color;
    nextCtx.fillRect((x + offsetX) * BLOCK_SIZE, (y + offsetY) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    nextCtx.strokeRect((x + offsetX) * BLOCK_SIZE, (y + offsetY) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
}));
}

function checkCollision(shape, x, y) {
return shape.some((row, dy) => row.some((cell, dx) => {
    if (cell) {
    const nx = x + dx;
    const ny = y + dy;
    return nx < 0 || nx >= COLS || ny >= ROWS || (BOARD[ny] && BOARD[ny][nx]);
    }
    return false;
}));
}

function merge() {
thetetro.shape.forEach((row, dy) => row.forEach((cell, dx) => {
    if (cell) {
    BOARD[thetetro.pos_y + dy][thetetro.pos_x + dx] = thetetro.color;
    }
}));
}

function clearRows() {
let rowCount = 0;
let y = ROWS - 1;
while (y >= 0) {
    if (BOARD[y].every(cell => cell)) {
    BOARD.splice(y, 1);
    BOARD.unshift(Array(COLS).fill(null));
    rowCount++;
    } else {
    y--;
    }
}
if (rowCount > 0) {
    score += rowCount * 120;
    document.getElementById('score').innerText = "Score: " + score;
}
}

function gameLoop() {
if (!checkCollision(thetetro.shape, thetetro.pos_x, thetetro.pos_y + 1)) {
    thetetro.pos_y++;
} else {
    merge();
    clearRows();
    thetetro = nextetetro;
    nextetetro = getNewTetromino();

    if (checkCollision(thetetro.shape, thetetro.pos_x, thetetro.pos_y)) {
    stopGame();  // Stop the game loop on game over
    alert("Game Over! Score: " + score);
    }
}
draw();
}

// Remove the auto-start interval
// let gameInterval = setInterval(gameLoop, 500);
let gameInterval = null;

// Start and stop game functions
function startGame() {
if (!gameInterval) {
    gameInterval = setInterval(gameLoop, 500);
}
}

function stopGame() {
if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
}
}

// Event listener for key presses
document.addEventListener('keydown', (event) => {
if (event.key === 'ArrowLeft' && !checkCollision(thetetro.shape, thetetro.pos_x - 1, thetetro.pos_y)) {
    thetetro.pos_x--;
} else if (event.key === 'ArrowRight' && !checkCollision(thetetro.shape, thetetro.pos_x + 1, thetetro.pos_y)) {
    thetetro.pos_x++;
} else if (event.key === 'ArrowDown' && !checkCollision(thetetro.shape, thetetro.pos_x, thetetro.pos_y + 1)) {
    thetetro.pos_y++;
} else if (event.key === 'ArrowUp') {
    thetetro.rotate();
}
draw();
});


document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('stop-button')?.addEventListener('click', stopGame);


draw();
