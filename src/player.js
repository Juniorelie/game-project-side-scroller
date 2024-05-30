class Player {
    constructor() {
        this.playerElement = document.querySelector(".player");
        this.jumping = false;
    }

    jumpListener() {
        document.addEventListener("keydown", (event) => {
            if (event.key === " " || event.key === "ArrowUp") {
                this.jump();
            }
        });
        document.addEventListener("click", () => this.jump());
    }

    jump() {
        if (this.jumping) return;
        this.jumping = true;
        this.playerElement.classList.add("jump");
        setTimeout(() => {
            this.playerElement.classList.remove("jump");
            this.jumping = false;
        }, 800);
    }
}
