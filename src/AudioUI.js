class AudioUI {
    constructor() {
        this.backgroundMusic = document.getElementById("background-music");
        this.homepageMuteButton = document.querySelector(".homepage-mute-btn");
        this.gameMuteButton = document.querySelector(".game-mute-btn");
        this.isMuted = false;

        this.homepageMuteButton.addEventListener("click", () => this.toggleMute());
    }

    init() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }

    toggleMute() {
        if (this.isMuted) {
            this.backgroundMusic.play();
            this.homepageMuteButton.innerText = "Play/Pause Music";
            this.gameMuteButton.innerText = "Play/Pause Music";
        } else {
            this.backgroundMusic.pause();
            // this.homepageMuteButton.innerText = "Pause Music";
            // this.gameMuteButton.innerText = "Pause Music";
        }
        this.isMuted = !this.isMuted;
    }

    toggleGameMute() {
        this.toggleMute();
    }

    showGameMuteButton() {
        this.gameMuteButton.classList.remove("hidden");
        this.gameMuteButton.style.display = "block";
    }

    startGameMusic() {
        // Start playing game-specific music here if you have separate music for the game
    }
}
