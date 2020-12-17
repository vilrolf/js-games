const SQUARE_WIDTH = 10
const SQUARE_FILL_COLOR = "black";
const SQUARE_STROKE_COLOR = "blue";

const APPLE_FILL_COLOR = "green";
const APPLE_STROKE_COLOR = "black";

const CANVAS_WIDTH = 300;

let START_POSITION_X = 10;
let START_POSITION_Y = 10;

let x = START_POSITION_X;
let y = START_POSITION_X;
const SPEED = 10;
const INITIAL_INCOMING_FOOD = 5

let dx = SPEED;
let dy = 0;
const canvas = document.getElementById("gameCanvas");


const ctx = gameCanvas.getContext("2d");
document.addEventListener("keydown", changeDirection);
const INITIAL_SNAKE = [{ x: START_POSITION_X, y: START_POSITION_Y }]
let snake = INITIAL_SNAKE.slice()


let food = { x: 40, y: 40 }


let incomingFood = INITIAL_INCOMING_FOOD;

main()

function setRandomFoodPlacement() {
    const x = Math.round((Math.random() * (canvas.width - 0) + 0) / 10) * 10;
    const y = Math.round((Math.random() * (canvas.width - 0) + 0) / 10) * 10;
    food = { x, y }
}

function foodDetection() {
    if (food.x === snake[0].x && food.y === snake[0].y) {
        incomingFood = incomingFood + 3;
        setRandomFoodPlacement()
    }
}

function collisionDetection() {
    const head = snake[0]
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            window.alert(`GAME OVER, score: ${snake.length}`)
            snake = INITIAL_SNAKE.slice()
            incomingFood = INITIAL_INCOMING_FOOD;
            dx = SPEED;
            dy = 0;
        }
    }
}

function drawFood() {
    ctx.fillStyle = APPLE_FILL_COLOR;
    ctx.strokestyle = APPLE_STROKE_COLOR;
    ctx.beginPath();
    ctx.arc(food.x + SQUARE_WIDTH / 2, food.y + SQUARE_WIDTH / 2, SQUARE_WIDTH / 3, 0, Math.PI * 2)
    ctx.stroke();
    ctx.fill();
}

function moveSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy }
    snake.unshift(newHead)
    if (incomingFood > 0) {
        incomingFood--;
    } else {

        snake.pop()
    }
}

function drawSnake() {
    snake.forEach(s => drawSquare(s.x, s.y));
}
function drawSquare(x, y) {
    ctx.fillStyle = SQUARE_STROKE_COLOR;
    ctx.strokestyle = SQUARE_FILL_COLOR;
    ctx.fillRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH)
    ctx.strokeRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH)
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    foodDetection()
    collisionDetection()
    moveSnake()
    drawSnake()
    drawFood()
    x = x + dx;
    y = y + dy;
    setTimeout(main, 100)
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -SPEED;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -SPEED;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = SPEED;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = SPEED;
    }
}
