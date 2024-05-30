const playerElement = document.querySelector(".player");
const scoreElement = document.querySelector(".score-card .score");
const highScoreElement = document.querySelector(".score-card .highscore");
const restartGameElement = document.querySelector(".restart");
const gameContainerElement = document.querySelector(".game-container");

let enemySpeed = 10;
const akatsuki = [];
let newlyAddedShinobi = false;
let frameCounter = 0;

function jumpListener() {
	document.addEventListener("keydown", (event) => {
		if (event.key === " " || event.key === "ArrowUp") {
			jump()
		}
	})
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
	}, 800)
}

// Checking for collision

let gameInterval
function gameLoop() {
	gameInterval = setInterval(() => {
		frameCounter++
		if (!akatsuki.length) {
			akatsuki.push(addObstacles())
			newlyAddedShinobi = true
			setTimeout(() => {
				newlyAddedShinobi = false
			}, 5000)
		}

		if (frameCounter % 10 === 0 && !newlyAddedShinobi) {
			if (Math.random() > 0.98) {
				akatsuki.push(addObstacles())
				newlyAddedShinobi = true
				setTimeout(() => {
					newlyAddedShinobi = false
				}, 5000)
			}
		}
		// if (frameCounter % 300 === 0) {
		// 	enemySpeed += 20
		// }
		for (const badGuy of akatsuki) {
			// console.log(badGuy.style.left)
			let currentPosition = parseInt(badGuy.style.left)
			// console.log(currentPosition)
			if (currentPosition <= 0) {
				badGuy.style.left = `1000px`
			} else if (currentPosition) {
				currentPosition -= enemySpeed
				badGuy.style.left = `${currentPosition}px`
			} else {
				badGuy.style.left = `1000px`
			}
			if (isCollision(badGuy)) {
				checkHighScore();
				restartGame();
			}
		} 
		if (frameCounter % 10 === 0) {
			countScore();
		}
	}, 1000 / 60);
}

function isCollision(obstacle) {
	const playerClientRect = playerElement.getBoundingClientRect()
	const obstacleClientRect = obstacle.getBoundingClientRect()
  
	const xCollision = obstacleClientRect.right > playerClientRect.left && obstacleClientRect.left < playerClientRect.right;
  	const yCollision = playerClientRect.bottom > obstacleClientRect.top && playerClientRect.top < obstacleClientRect.bottom;

	return xCollision && yCollision
}

// Score monitoring

let score = 0

function showScore(newScore) {
	scoreElement.innerHTML = score = newScore
}

// let scoreInterval
function countScore() {
	showScore(score + 1)
}

let highScore = parseInt(localStorage.getItem("highscore")) || 0;
function setHighScore(newScore) {
	highScoreElement.innerText = newScore;
	localStorage.setItem("highscore", newScore)
}

function checkHighScore() {
	if (score > highScore) {
		highScore = score;
		setHighScore(score) 
	}
}

// // Randomizing obstacle numbers
const maxObstacles = 2
const minObstacles = 1
function createObstacle() {
	const obstacle = document.createElement("div")
	obstacle.className = "obstacle"
	return obstacle
}

function addObstacles() {
	// const numObstacles =
	// 	Math.floor(Math.random() * (maxObstacles - minObstacles + 1)) + minObstacles
	// for (let i = 0; i < numObstacles; i++) {
	const obstacle = createObstacle()
	gameContainerElement.appendChild(obstacle)
	return obstacle;
	// }
}

// Restarting the game

function restartGame() {
	clearInterval(gameInterval)
	// clearInterval(scoreInterval)
	restartGameElement.classList.add("show")
	gameContainerElement.classList.add("stop")
}

function reset() {
	location.reload()
}

function main() {
	jumpListener();
	gameLoop();
	highScoreElement.innerText = highScore;
}

main()
