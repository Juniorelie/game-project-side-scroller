const playerElement = document.querySelector(".player");
const obstacleElement = document.querySelector(".obstacle");
const scoreElement = document.querySelector(".score-card .score");
const highScoreElement = document.querySelector(".score-card .highscore");
const restartGameElement = document.querySelector(".restart");
const gameContainerElement = document.querySelector(".game-container");

// const obstacleSizes = ["m", "l", "xl"];

function jumpListener() {
  document.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "ArrowUp") {
      jump();
    }
  });
  document.addEventListener("click", function () {
    jump();
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
  }, 1000);
}

// Checking for collision

let collisionInterval;
function monitorCollision() {
  collisionInterval = setInterval(() => {
    if (isCollision()) {
      checkHighScore();
      // alert("You Died!");
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

// function getRandomObstacleSize() {
//   const index = Math.floor(Math.random() * (obstacleSizes.length - 1));
//   return obstacleSizes[index];
// }

// let changeObstacleInterval;
// function randomizeObstacle() {
//   changeObstacleInterval = setInterval(() => {
//     const obstacleSize = getRandomObstacleSize();
//     obstacleElement.className = `obstacle obstacle-${obstacleSize}`;
//   }, 1000);
// }

// Randomizing obstacle numbers
// const maxObstacles = 2;
// const minObstacles = 1;
// function createObstacle() {
//   const obstacle = document.createElement("div");
//   obstacle.className = "obstacle";
//   return obstacle;
// }

// function addObstacles() {
//   const numObstacles =
//     Math.floor(Math.random() * (maxObstacles - minObstacles + 1)) +
//     minObstacles;
//   for (let i = 0; i < numObstacles; i++) {
//     const obstacle = createObstacle();
//     gameContainerElement.appendChild(obstacle);
//   }
// }

// Obstacle speed up

let obstacleSpeedInterval;
function obstacleSpeedUp() {
  let animationDuration = 2; // Initial duration in seconds
  const speedUpInterval = 20 * 1000; // 20 seconds in milliseconds
  const speedUpFactor = 1.2; // speed at which the obstacle will increase every 20 seconds

  function updateAnimationDuration() {
    animationDuration /= speedUpFactor;
    obstacleElement.style.animation = "none"; // reset animation
    obstacleElement.offsetHeight; // trigger a reflow, flushing the css changes
    obstacleElement.style.animation = `move ${animationDuration}s linear infinite`; // reapplying animation
  }

  obstacleSpeedInterval = setInterval(updateAnimationDuration, speedUpInterval);

  // setInterval(() => {
  //   animationDuration /= speedUpFactor;
  //   obstacleElement.style.animationDuration = `${animationDuration}s`;
  // }, speedUpInterval);
}

// Restarting the game

function restartGame() {
  clearInterval(collisionInterval);
  clearInterval(scoreInterval);
  // clearInterval(changeObstacleInterval);
  clearInterval(obstacleSpeedInterval);
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
  // randomizeObstacle();
  obstacleSpeedUp();
  // addObstacles();
}

main();
