/**
 * Contains all game numbers and balancing
 */

// General game config
const FRAME_PER_SECOND = 30;
const ANGLE_MULTIPLICATOR = 5;
const POINTS_TO_WIN = 3;
const BOUNCE_ACCELERATION = 1;

// Paddle
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_PLAYER_START_X = 0;
const PADDLE_PLAYER_START_Y = 250;
const PADDLE_OPPONENT_START_X = 800 - PADDLE_WIDTH;
const PADDLE_OPPONENT_START_Y = 400 - PADDLE_HEIGHT / 2;
const PADDLE_STYLE = 'white';
const PADDLE_OPPONENT_Y_SPEED = 6;
const PADDLE_OPPONENT_DEAD_ZONE = 30;

// Ball
const BALL_START_X = 75;
const BALL_START_SPEED_X = 8;
const BALL_START_SPEED_Y = 6;
const BALL_RADIUS = 10;
const BALL_STYLE = 'white';

// Background
const BACKGROUND_STYLE = 'black';

// Net
const NET_STYLE = 'white';

// Text
const TEXT_STYLE = 'white';