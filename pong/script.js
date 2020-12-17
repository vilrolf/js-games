const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d");
const PADDLE_HEIGTH = 50;
const PADDLE_WIDTH = 10;

const FILL_COLOR = "white";
const WIDTH = canvas.width;
const HEIGTH = canvas.height;
const BALL_WIDTH = 10;
const BALL_START_X = WIDTH / 2
const BALL_START_Y = HEIGTH / 2

const PADDLE_SPEED = 4;

const ball = {
    x: BALL_START_X,
    y: BALL_START_Y,
    dx: 2,
    dy: 0,
}

const playerPaddle = {
    x: WIDTH - 20,
    y: HEIGTH / 2 - (PADDLE_HEIGTH / 2),
    dy: 0,
}

function moveBall() {
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;
}

function movePaddle() {
    if (playerPaddle.y >= HEIGTH - PADDLE_HEIGTH && playerPaddle.dy > 0) return
    if (playerPaddle.y <= 0 && playerPaddle.dy < 0) return
    playerPaddle.y = playerPaddle.y + playerPaddle.dy;
}
function collisionDetection() {
    if (ball.y <= 0 || ball.y >= HEIGTH - BALL_WIDTH) {
        ball.dy = ball.dy * -1
    }
    if (ball.x >= playerPaddle.x) {
        const relativePosition = ball.y - playerPaddle.y
        if (relativePosition >= 0 && relativePosition <= PADDLE_HEIGTH) {
            ball.dx = ball.dx * -1.1
            ball.dy = ball.dy + (relativePosition - 25) / 10

        } else {
            window.alert('GOver')
        }
    }
    if (ball.x <= 10) {
        ball.dx = ball.dx * -1.1
    }
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionDetection()
    drawBall(ball.x, ball.y)
    drawPaddle(playerPaddle.x, playerPaddle.y)
    drawPaddle(10, ball.y - (PADDLE_HEIGTH /2))
    // ctx.fillText("Pong", 10,50)
    movePaddle(playerPaddle);
    moveBall();
    setTimeout(main, 20)
}

function drawBall(x, y) {
    ctx.fillStyle = FILL_COLOR;
    ctx.fillRect(x, y, BALL_WIDTH, BALL_WIDTH)
}

function drawPaddle(x, y) {
    ctx.fillStyle = FILL_COLOR;
    ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGTH)
}
function stopMotion(e) {
    playerPaddle.dy = 0;
}
function changeDirection(event) {
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;


    if (keyPressed === UP_KEY) {
        playerPaddle.dy = -PADDLE_SPEED;
    }

    if (keyPressed === DOWN_KEY) {
        playerPaddle.dy = PADDLE_SPEED;
    }
}

drawPaddle(10, 10)
drawPaddle(WIDTH - 20, 10)

// drawBall(ball.x, ball.y)


document.addEventListener("keydown", changeDirection);
document.addEventListener("keyup", stopMotion);

main()