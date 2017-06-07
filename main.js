let canvas, canvasContext;
let ball, background, leftPaddle, rightPaddle;
let score, endStatus, isEndTriggered;

/**
 * Game start
 */
window.onload = function () {
    // Load game elements
    load();
    // Manage inputs
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
        leftPaddle.y = mousePos.y - (leftPaddle.height / 2);
    });
    // Loop
    setInterval(() => {
        update();
        draw();
    }, 1000 / FRAME_PER_SECOND);
}

/**
 * Loading game elements 
 * */
function load() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.textAlign = 'center';
    background = new Background(canvas.width, canvas.height);
    ball = new Ball(BALL_START_X);
    leftPaddle = new Paddle(PADDLE_PLAYER_START_X, PADDLE_PLAYER_START_Y);
    rightPaddle = new PaddleAI(PADDLE_OPPONENT_START_X, PADDLE_OPPONENT_START_Y);
    score = new ScoreManager();
    endStatus = 0;
    isEndTriggered = false;
}

/**
 * Update loop
 */
function update() {
    // End condition
    endStatus = checkVictory();

    // End logic
    if (endStatus != 0) {
        // Mouse click to restart game
        if (!isEndTriggered) {
            drawEndGame(canvasContext);
            canvas.addEventListener('click', function (evt) {
                if (endStatus != 0)
                    reset();
            });
            isEndTriggered = true;
        }
        return;
    }

    // Game logic
    if (endStatus == 0) {
        ball.update(canvas);
        leftPaddle.update();
        rightPaddle.update(ball);
        // Hozizontal out of terrain
        // - Left side
        if (ball.x <= leftPaddle.width) {
            // Ball on pad
            if (ball.y >= leftPaddle.y - ball.radius / 2 && ball.y <= leftPaddle.y + leftPaddle.height + ball.radius / 2) {
                ball.bounce(leftPaddle, canvas);
            }
            // Ball missed
            else {
                if (ball.x < 0) {
                    score.opponentMarks();
                    // Reset ball except if game is won, to get end photo
                    if (checkVictory() == 0) ball.reset();
                }
            }
        }
        // Right side
        if (ball.x > canvas.width - rightPaddle.width) {
            if (ball.y >= rightPaddle.y - ball.radius / 2 && ball.y <= rightPaddle.y + rightPaddle.height + ball.radius / 2) {
                ball.bounce(rightPaddle, canvas);
            }
            else {
                if (ball.x > canvas.width) {
                    score.playerMarks();
                    if (checkVictory() == 0) ball.reset();
                }
            }
        }
    }
}

/**
 * Draw loop
 */
function draw() {
    if (endStatus == 0) {
        background.draw(canvasContext);
        drawNet(canvasContext);
        ball.draw(canvasContext);
        leftPaddle.draw(canvasContext);
        rightPaddle.draw(canvasContext);
    }
    drawScore(canvasContext);
}

/**
 * Reset the game
 */
function reset() {
    score.reset();
    ball.reset();
    isEndTriggered = false;
    endStatus = 0;
}

/**
 * Get mouse position on screen
 * @param {event} evt - Passing mouse move
 */
function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

/**
 * Returns true when game is won
 */
function checkVictory() {
    if (score.playerScore == POINTS_TO_WIN)
        return 1;
    else if (score.opponentScore == POINTS_TO_WIN)
        return 2;
    else
        return 0;
}

/**
 * Draw a net in the middle of the canvas
 * @param {*} canvasContext - context to draw in
 */
function drawNet(canvasContext) {
    canvasContext.strokeStyle = NET_STYLE;
    canvasContext.setLineDash([5, 10]);
    canvasContext.beginPath();
    canvasContext.moveTo(400, 0);
    canvasContext.lineTo(400, 600);
    canvasContext.stroke();
}

/**
 * Draw game scores
 */
function drawScore(canvasContext) {
    canvasContext.fillText(score.playerScore + ' : ' + score.opponentScore, canvas.width / 2, 20);
}

/**
 * Draw victory screen
 */
function drawEndGame(canvasContext) {
    background.draw(canvasContext);
    canvasContext.fillStyle = TEXT_STYLE;
    if (endStatus == 1) {
        canvasContext.fillText('Player wins !', canvas.width / 2, canvas.height / 2);
    } else if (endStatus == 2) {
        canvasContext.fillText('Robot wins !', canvas.width / 2, canvas.height / 2);
    }
    setTimeout(() => {
        canvasContext.fillText('Click to play again', canvas.width / 2, canvas.height / 2 + 50);
    }, 1000);
}