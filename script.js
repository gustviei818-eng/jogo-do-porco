const pig = document.getElementById("pig");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const jumpButton = document.getElementById("jumpButton");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");

let score = 0;
let playing = false;
let gameOver = false;

function jump() {
    if (!playing || gameOver) return;

    if (!pig.classList.contains("jump")) {
        pig.classList.add("jump");

        setTimeout(() => {
            pig.classList.remove("jump");
        }, 600);
    }
}

function startGame() {
    score = 0;
    playing = true;
    gameOver = false;

    scoreText.textContent = score;
    message.textContent = "Corra e pule os obstáculos!";

    restartButton.style.display = "none";

    obstacle.classList.remove("move");

    setTimeout(() => {
        obstacle.classList.add("move");
    }, 100);
}

function endGame() {
    playing = false;
    gameOver = true;

    obstacle.classList.remove("move");

    message.textContent = "💥 Game Over! Pontuação: " + score;
    restartButton.style.display = "inline-block";
}

jumpButton.addEventListener("click", () => {
    if (!playing) {
        startGame();
    }

    jump();
});

restartButton.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();

        if (!playing) {
            startGame();
        }

        jump();
    }
});

setInterval(() => {
    if (!playing || gameOver) return;

    score++;
    scoreText.textContent = score;

    const pigRect = pig.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        pigRect.right > obstacleRect.left + 10 &&
        pigRect.left < obstacleRect.right - 10 &&
        pigRect.bottom > obstacleRect.top + 10
    ) {
        endGame();
    }
}, 100);