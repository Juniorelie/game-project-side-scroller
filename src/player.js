const playerElement = document.querySelector(".player");
const obstacleElement = document.querySelector(".obstacle");
const scoreElement = document.querySelector(".score-card .score");
const highScoreElement = document.querySelector(".score-card .highscore");
const restartGameElement = document.querySelector(".restart");
const gameContainerElement = document.querySelector(".game-container");

const obstacleSizes = ["m", "l", "xl"];

function jumpListener() {
  document.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "ArrowUp") {
      jump();
    }
  });
}

let jumping = false;
function jump() {
  if (jumping) {
    return;
  } else {
    jumping = true;
  }
  playerElement.classList.add("jump");
  setTimeout(() => {
    playerElement.classList.remove("jump");
    jumping = false;
  }, 800);
}

// Checking for collision

let collisionInterval;
function monitorCollision() {
  collisionInterval = setInterval(() => {
    if (isCollision()) {
      checkHighScore();
      //   alert("You Died!");
      restartGame();
    }
  }, 10);
}

function isCollision() {
  const playerClientRect = playerElement.getBoundingClientRect();
  const playerL = playerClientRect.left;
  const playerR = playerClientRect.right;
  const playerT = playerClientRect.top;
  const playerB = playerClientRect.bottom;

  const obstacleClientRect = obstacleElement.getBoundingClientRect();
  const obstacleL = obstacleClientRect.left;
  const obstacleR = obstacleClientRect.right;
  const obstacleT = obstacleClientRect.top;
  const obstacleB = obstacleClientRect.bottom;

  const xCollision = obstacleR > playerL && obstacleL < playerR;
  const yCollision = playerB > obstacleT && playerT < obstacleB;

  return xCollision && yCollision;
}

// Score monitoring

let score = 0;

function showScore(newScore) {
  scoreElement.innerHTML = score = newScore;
}

let scoreInterval;
function countScore() {
  scoreInterval = setInterval(() => {
    showScore(score + 1);
  }, 300);
}

let highScore = localStorage.getItem("highscore") || 0;
function setHighScore(newScore) {
  highScoreElement.innerText = highScore = newScore;
  localStorage.setItem("highscore", newScore);
}

function checkHighScore() {
  if (score > highScore) {
    setHighScore(score);
  }
}

// Randomizing obstacle sizes

function getRandomObstacleSize() {
  const index = Math.floor(Math.random() * (obstacleSizes.length - 1));
  return obstacleSizes[index];
}

let changeObstacleInterval;
function randomizeObstacle() {
  changeObstacleInterval = setInterval(() => {
    const obstacleSize = getRandomObstacleSize();
    obstacleElement.className = `obstacle obstacle-${obstacleSize}`;
  }, 2000);
}

// Randomizing obstacle number

// Restarting the game

function restartGame() {
  clearInterval(collisionInterval);
  clearInterval(scoreInterval);
  clearInterval(changeObstacleInterval);
  restartGameElement.classList.add("show");
  gameContainerElement.classList.add("stop");
}

function reset() {
  location.reload();
}

function main() {
  jumpListener();
  monitorCollision();
  countScore();
  setHighScore(highScore);
  randomizeObstacle();
}

// export { main };

main();
