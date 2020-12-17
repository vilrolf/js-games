const CANVAS_BORDER_COLOUR = 'red';
const CANVAS_BACKGROUND_COLOUR = "black";

const SQUARE_WIDTH = 3


let START_POSITION_X = 300;
let START_POSITION_Y = 300;
const SPEED = 1;

let s1 = { x: START_POSITION_X, y: START_POSITION_Y, color: 'blue', direction: 2 * Math.PI }
const canvas = document.getElementById("gameCanvas");


const ctx = canvas.getContext("2d");
let timer;



document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", stopChangingDirection)
ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
//  Select the colour for the border of the canvas
ctx.strokeStyle = CANVAS_BORDER_COLOUR;
// Draw a "filled" rectangle to cover the entire canvas
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
// Draw a "border" around the entire canvas
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
main()




function getNextSnakePixel(s) {
    const dx = Math.sin(s.direction)
    const dy = Math.cos(s.direction)
    return {
        x: s.x + dx,
        y: s.y + dy,
    }
}

function drawSnakePoint(s) {
    ctx.fillStyle = s.color;

    ctx.fillRect(s.x, s.y, SQUARE_WIDTH, SQUARE_WIDTH)
    // ctx.strokeRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH)
}
function collisionDetection(s) {
    const { x, y } = getNextSnakePixel(s)

    console.log('x', x)
    console.log('y', y)


    if (x <= 0 || x >= canvas.width || y <= 0 || y >= canvas.height) {
        window.alert('Game over')
        return;
    }

    const pData = ctx.getImageData(x, y, 3, 1).data;
    console.log(pData)
    console.log(s)
    ctx.fillStyle = "white";
    if (pData[0] != 0 || pData[1] != 0 || pData[2] != 0) {
        ctx.fillStyle = "red";

        // return
    }


    ctx.fillRect(x, y, 1, 1)
}

function main() {
    drawSnakePoint(s1)
    const { x, y } = getNextSnakePixel(s1)
    s1.x = x; s1.y = y;

    collisionDetection(s1)
    setTimeout(main, 20)
}

function stopChangingDirection(e) {
    console.log('up')

    clearInterval(timer)
    timer = null;
}

function onKeyDown(e) {
    console.log('down')
    if (timer) return;
    timer = setInterval(() => changeDirection(e), 20);
}
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;

    const keyPressed = event.keyCode;

    if (keyPressed === LEFT_KEY) {
        s1.direction = s1.direction + 0.1
    }

    if (keyPressed === RIGHT_KEY) {
        s1.direction = s1.direction - 0.1

    }
}
