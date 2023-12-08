// QuerySelector Variables
let gameBoard = document.querySelector('#snakeGame');

let ctx = gameBoard.getContext('2d');

let resetBtn = document.querySelector('.resetBtn');

let scoreText = document.querySelector('.score');

// Game Variables

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardColor = 'black';
const unitSize = 20;
let foodX, foodY;
const foodColor = 'red';
const snakeColor = 'green';
const snakeBorder = 'black';
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];
let xVelocity = unitSize;
let yVelocity = 0;
let score = 0;
let running = false;

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

// Game functions

function gameStart() {
    running = true;
    scoreText.innerText = score;
    createFood();
    nextCheck();
}

function nextCheck() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            drawSnake();
            moveSnake();
            checkGameOver();
            nextCheck();
        }, 100);
    }
    else {
        displayGameOver();
    }
}

function changeDirection(event) {
    let keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    let goingUp = (yVelocity == -unitSize);
    let goingDown = (yVelocity == unitSize);
    let goingRight = (xVelocity == unitSize);
    let goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == UP && !goingDown):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;
        case (keyPressed == DOWN && !goingUp):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
        case (keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
    }
}

function resetGame() {
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    gameStart();
}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = 'red';
    ctx.textAlign = 'centre';
    ctx.fillText("Game Over", gameWidth / 5, gameHeight / 2);
    running = false;
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            running = false;
        }
    }
}

function createFood() {
    function randomNumber(min, max) {
        let randVar = Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randVar;
    }
    foodX = randomNumber(0, gameWidth - unitSize);
    foodY = randomNumber(0, gameWidth - unitSize);
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function clearBoard() {
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;

    snake.forEach((s) => {
        ctx.fillRect(s.x, s.y, unitSize, unitSize);
        ctx.strokeRect(s.x, s.y, unitSize, unitSize);
    })
}

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    }
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score+=10;
        scoreText.innerText = score;
        createFood();
    }
    else {
        snake.pop();
    }
}

gameStart();

