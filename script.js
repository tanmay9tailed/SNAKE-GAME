const boxHeight = 30;
const boxWidth = 30;
const board = document.querySelector(".board");
const scoreElement = document.querySelector(".current-score");
const highscoreElement = document.querySelector(".high-score");
const startModal = document.getElementById("startModal");
const start = document.getElementById("start");
const gameOverModal = document.getElementById("gameOverModal");
const restartBtn = document.getElementById("restartGame");

const boardHeight = board.clientHeight;
const boardWidth = board.clientWidth;

const rows = Math.floor(boardHeight / boxHeight);
const cols = Math.floor(boardWidth / boxWidth);

let gameInterval = null;

let boxes = [];

let snake = [
  { x: 2, y: 6, body: "head" },
  { x: 2, y: 7, body: "body" },
  { x: 2, y: 8, body: "body" },
];

let direction = "";

let food = generateFood();

let currentScore = 0;

let highscore = localStorage.getItem("highscore") || 0;
highscoreElement.innerText = highscore;

function drawBoard() {
  for (let i = 0; i < rows; i++) {
    boxes[i] = [];
    for (let j = 0; j < cols; j++) {
      const box = document.createElement("div");
      box.classList = "box";
      board.appendChild(box);
      boxes[i][j] = box;
    }
  }
}

drawBoard();

function drawSnake() {
  try {
    snake.forEach((part) => {
      const box = boxes[part.x][part.y];
      if (part.body === "head") {
        box.classList = "snake-head";
      } else {
        box.classList = "snake-body";
      }
    });
  } catch (error) {
    clearInterval(gameInterval); // stop game
    gameOverModal.classList.add("show");
    document.getElementById("finalScore").innerText = currentScore;
  }
}

function moveSnake() {
  if (direction === "LEFT") {
    snake[0].body = "body";

    const newX = snake[0].x;
    const newY = snake[0].y - 1;

    snake.unshift({ x: newX, y: newY, body: "head" });

    let oldX = snake[snake.length - 1].x;
    let oldY = snake[snake.length - 1].y;

    if (newX == food.x && newY == food.y) {
      boxes[food.x][food.y].classList = "box";
      food = generateFood();
      boxes[food.x][food.y].classList = "food";
      updateScore();
    } else {
      boxes[oldX][oldY].classList = "box";
      snake.pop();
    }
  } else if (direction === "RIGHT") {
    snake[0].body = "body";

    const newX = snake[0].x;
    const newY = snake[0].y + 1;

    snake.unshift({ x: newX, y: newY, body: "head" });

    let oldX = snake[snake.length - 1].x;
    let oldY = snake[snake.length - 1].y;

    if (newX == food.x && newY == food.y) {
      boxes[food.x][food.y].classList = "box";
      food = generateFood();
      boxes[food.x][food.y].classList = "food";
      updateScore();
    } else {
      boxes[oldX][oldY].classList = "box";
      snake.pop();
    }
  } else if (direction === "UP") {
    snake[0].body = "body";

    const newX = snake[0].x - 1;
    const newY = snake[0].y;

    snake.unshift({ x: newX, y: newY, body: "head" });

    let oldX = snake[snake.length - 1].x;
    let oldY = snake[snake.length - 1].y;

    if (newX == food.x && newY == food.y) {
      boxes[food.x][food.y].classList = "box";
      food = generateFood();
      boxes[food.x][food.y].classList = "food";
      updateScore();
    } else {
      boxes[oldX][oldY].classList = "box";
      snake.pop();
    }
  } else if (direction === "DOWN") {
    snake[0].body = "body";

    const newX = snake[0].x + 1;
    const newY = snake[0].y;

    snake.unshift({ x: newX, y: newY, body: "head" });

    let oldX = snake[snake.length - 1].x;
    let oldY = snake[snake.length - 1].y;

    if (newX == food.x && newY == food.y) {
      boxes[food.x][food.y].classList = "box";
      food = generateFood();
      boxes[food.x][food.y].classList = "food";
      updateScore();
    } else {
      boxes[oldX][oldY].classList = "box";
      snake.pop();
    }
  }
}

function generateFood() {
  let x = Math.floor(Math.random() * rows);
  let y = Math.floor(Math.random() * cols);
  return { x, y };
}

function updateScore() {
  currentScore++;
  scoreElement.innerText = currentScore;
  if (currentScore > highscore) {
    highscoreElement.innerText = currentScore;
    localStorage.setItem("highscore", currentScore);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

generateFood();
boxes[food.x][food.y].classList = "food";

function startGame() {
  if (gameInterval) clearInterval(gameInterval);

  gameInterval = setInterval(() => {
    moveSnake();
    drawSnake();
  }, 250);
}

start.addEventListener("click", () => {
  startGame();
  startModal.classList.remove("show");
});

restartBtn.addEventListener("click", () => {
  gameOverModal.classList.remove("show");
  currentScore = 0;
  scoreElement.innerText = currentScore;
  snake = [
    { x: 2, y: 6, body: "head" },
    { x: 2, y: 7, body: "body" },
    { x: 2, y: 8, body: "body" },
  ];
  direction = "";
  board.innerHTML = "";
  drawBoard();
  generateFood();
  boxes[food.x][food.y].classList = "food";
  startGame();
});
