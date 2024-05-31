class Game {
  constructor(player, obstacles, audioUI) {
    this.player = player;
    this.obstacles = obstacles;
    this.audioUI = audioUI;

    this.score = 0;
    this.highScore = parseInt(sessionStorage.getItem("highscore")) || 0;
    this.frameCounter = 0;
    this.enemySpeed = 11;
    this.newlyAddedShinobi = false;
    this.gameInterval = null;
    this.speedIncreaseInterval = null;

    this.startButton = document.querySelector(".start-btn");
    this.restartButton = document.querySelector(".restart-btn");
    this.gameMuteButton = document.querySelector(".game-mute-btn");
    // this.gameHomeButton = document.querySelector(".game-home-btn");
    this.homepageElement = document.querySelector(".homepage");
    this.gameContainerElement = document.querySelector(".game-container");
    this.scoreElement = document.querySelector(".score-card .score");
    this.highScoreElement = document.querySelector(".score-card .highscore");
    this.restartGameElement = document.querySelector(".restart");

    this.startButton.addEventListener("click", () => this.startGame());
    this.restartButton.addEventListener("click", () => this.reset());
    this.gameMuteButton.addEventListener("click", () =>
      this.audioUI.toggleGameMute()
    );
    // this.gameHomeButton.addEventListener("click", () =>
    //   this.audioUI.location.reload()
    // );

    this.highScoreElement.innerText = this.highScore;
    this.audioUI.init();
  }

  startGame() {
    this.homepageElement.classList.add("hidden");
    this.gameContainerElement.classList.remove("hidden");
    this.obstacles.addObstacle();
    this.gameLoop();
    this.audioUI.showGameMuteButton();
    // this.audioUI.showGameHomeButton();
  }

  gameLoop() {
    this.player.jumpListener();
    this.player.crouchListener();
    this.gameInterval = setInterval(() => {
      this.frameCounter += 2;
      if (!this.obstacles.akatsuki.length) {
        this.obstacles.akatsuki.push(this.obstacles.addObstacle());
        this.newlyAddedShinobi = true;
        setTimeout(() => {
          this.newlyAddedShinobi = false;
        }, 5000);
      }

      if (this.frameCounter % 40 === 0 && !this.newlyAddedShinobi) {
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
        if (currentPosition <= 0) {
          badGuy.style.left = `1000px`;
        } else if (currentPosition) {
          currentPosition -= this.enemySpeed;
          badGuy.style.left = `${currentPosition}px`;
        } else {
          badGuy.style.left = `1000px`;
        }
        if (this.obstacles.isCollision(this.player.playerElement, badGuy)) {
          // Remove all obstacles
          console.log(this.obstacles);
          this.obstacles.reset();
          this.checkHighScore();
          this.restartGame();
          return;
        }
      }
      if (this.frameCounter % 4 === 0) {
        // Update score
        this.countScore();
      }
    }, 1000 / 60);

    // Increase obstacle speed every 15 seconds
    this.speedIncreaseInterval = setInterval(() => {
      this.increaseSpeed();
    }, 15000);
  }

  increaseSpeed() {
    this.enemySpeed += 3; // Increment the speed by 3 every 15 seconds
  }

  showScore(newScore) {
    this.scoreElement.innerHTML = this.score = newScore;
  }

  countScore() {
    this.showScore(this.score + 1);
  }

  setHighScore(newScore) {
    this.highScoreElement.innerText = newScore;
    sessionStorage.setItem("highscore", newScore);
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
    // console.log(this.obstacles);
    // Reset score and other game parameters
    this.score = 0;
    this.frameCounter = 0;
    this.enemySpeed = 11;
    this.newlyAddedShinobi = false;

    // Reset UI elements
    this.showScore(this.score);
    this.restartGameElement.classList.remove("show");
    this.gameContainerElement.classList.remove("stop");

    // Restart the game loop
    this.startGame();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const player = new Player();
  const obstacles = new Obstacles();
  const audioUI = new AudioUI();

  new Game(player, obstacles, audioUI);
});
