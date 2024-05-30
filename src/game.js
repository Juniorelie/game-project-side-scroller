class Game {
    constructor(player, obstacles, audioUI) {
        this.player = player;
        this.obstacles = obstacles;
        this.audioUI = audioUI;

        this.score = 0;
        this.highScore = parseInt(localStorage.getItem("highscore")) || 0;
        this.frameCounter = 0;
        this.enemySpeed = 10;
        this.newlyAddedShinobi = false;
        this.gameInterval = null;
        this.speedIncreaseInterval = null;

        this.startButton = document.querySelector(".start-btn");
        this.restartButton = document.querySelector(".restart-btn");
        this.gameMuteButton = document.querySelector(".game-mute-btn");
        this.homepageElement = document.querySelector(".homepage");
        this.gameContainerElement = document.querySelector(".game-container");
        this.scoreElement = document.querySelector(".score-card .score");
        this.highScoreElement = document.querySelector(".score-card .highscore");
        this.restartGameElement = document.querySelector(".restart");

        this.startButton.addEventListener("click", () => this.startGame());
        this.restartButton.addEventListener("click", () => this.reset());
        this.gameMuteButton.addEventListener("click", () => this.audioUI.toggleGameMute());

        this.highScoreElement.innerText = this.highScore;
        this.audioUI.init();
    }

    startGame() {
        this.homepageElement.classList.add('hidden');
        this.gameContainerElement.classList.remove('hidden');
        this.player.jumpListener();
        this.obstacles.addObstacle();
        this.gameLoop();
        this.audioUI.showGameMuteButton();
    }

    gameLoop() {
        this.gameInterval = setInterval(() => {
            this.frameCounter++;
            if (!this.obstacles.akatsuki.length) {
                this.obstacles.akatsuki.push(this.obstacles.addObstacle());
                this.newlyAddedShinobi = true;
                setTimeout(() => {
                    this.newlyAddedShinobi = false;
                }, 5000);
            }

            if (this.frameCounter % 10 === 0 && !this.newlyAddedShinobi) {
                if (Math.random() > 0.98) {
                    this.obstacles.akatsuki.push(this.obstacles.addObstacle());
                    this.newlyAddedShinobi = true;
                    setTimeout(() => {
                        this.newlyAddedShinobi = false;
                    }, 5000);
                }
            }

            for (const badGuy of this.obstacles.akatsuki) {
                let currentPosition = parseInt(badGuy.style.left);
                // if (currentPosition <= 0) {
                //     badGuy.remove(); // Remove the obstacle when it goes off-screen
                // } else {
                //     currentPosition -= this.enemySpeed;
                //     badGuy.style.left = `${currentPosition}px`;
                // }
                if (currentPosition <= 0) {
                    badGuy.style.left = `1000px`
                } else if (currentPosition) {
                    currentPosition -= this.enemySpeed
                    badGuy.style.left = `${currentPosition}px`
                } else {
                    badGuy.style.left = `1000px`
                }
                if (this.obstacles.isCollision(this.player.playerElement, badGuy)) {
                    this.checkHighScore();
                    this.restartGame();
                }
            }
            if (this.frameCounter % 5 === 0) { // Update score
                this.countScore();
            }
        }, 1000 / 60);

        // Increase obstacle speed every 15 seconds
        this.speedIncreaseInterval = setInterval(() => {
            this.increaseSpeed();
        }, 15000);
    }

    increaseSpeed() {
        this.enemySpeed *= 2; // Increase the speed two times every 15 seconds
    }

    showScore(newScore) {
        this.scoreElement.innerHTML = this.score = newScore;
    }

    countScore() {
        this.showScore(this.score + 1);
    }

    setHighScore(newScore) {
        this.highScoreElement.innerText = newScore;
        localStorage.setItem("highscore", newScore);
    }

    checkHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.setHighScore(this.score);
        }
    }

    restartGame() {
        clearInterval(this.gameInterval);
        clearInterval(this.speedIncreaseInterval);
        this.restartGameElement.classList.add("show");
        this.gameContainerElement.classList.add("stop");
    }

    reset() {
        location.reload();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const player = new Player();
    const obstacles = new Obstacles();
    const audioUI = new AudioUI();

    new Game(player, obstacles, audioUI);
});
