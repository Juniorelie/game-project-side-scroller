class Obstacles {
    constructor() {
        this.gameContainerElement = document.querySelector(".game-container");
        this.akatsuki = [];
    }

    createObstacle() {
        const obstacle = document.createElement("div");
        obstacle.className = "obstacle";
        obstacle.style.left = '1000px'; // Set initial position
        return obstacle;
    }

    addObstacle() {
        const obstacle = this.createObstacle();
        this.gameContainerElement.appendChild(obstacle);
        return obstacle;
    }

    isCollision(player, obstacle) {
        const playerClientRect = player.getBoundingClientRect();
        const obstacleClientRect = obstacle.getBoundingClientRect();

        const xCollision = obstacleClientRect.right > playerClientRect.left && obstacleClientRect.left < playerClientRect.right;
        const yCollision = playerClientRect.bottom > obstacleClientRect.top && playerClientRect.top < obstacleClientRect.bottom;

        return xCollision && yCollision;
    }
}
