/**
 * The ball the players have to catch
 */
class Ball {

  constructor(x, y = Math.round(Math.random() * 450 + 75), radius = BALL_RADIUS, speedX = BALL_START_SPEED_X, speedY = BALL_START_SPEED_Y) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update(canvas) {
    // Move
    this.x += this.speedX;
    this.y += this.speedY;
    // Bounce
    if (this.y > canvas.height || this.y < 0)
      this.speedY *= -1;
  }

  draw(canvasContext) {
    canvasContext.fillStyle = BALL_STYLE;
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }


  /**
   * Called when a ball bounces on the paddle
   * @param {*} paddle - Paddle on which the ball bounces
   */
  bounce(paddle, canvas) {
    this.speedY = paddle.getBounceVerticalSpeed(this.y);
    this.accelerate();
    this.speedX *= -1;
    // Place ball in case it got out of screen because of speed
    if(this.x < canvas.width / 2)
      this.x = paddle.x + paddle.width;
    else
      this.x = paddle.x;
  }

  /**
   * Each time the ball is hit, it accelerates
   */
  accelerate() {
    this.speedX = this.speedX + BOUNCE_ACCELERATION * Math.sign(this.speedX);
  }

  /**
   * Reset ball position and speed
   */
  reset() {
    this.x = BALL_START_X;
    this.y = Math.round(Math.random() * 450 + 75);
    this.speedX = BALL_START_SPEED_X;
    this.speedY = BALL_START_SPEED_Y;
  }
}