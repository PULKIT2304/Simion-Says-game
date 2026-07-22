let gameSeq = [];
let userSeq = [];

const btns = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;
let highScore = 0;

const h2 = document.querySelector("h2");
const startBtn = document.querySelector(".start");
const levelDisplay = document.getElementById("level");
const highDisplay = document.getElementById("high");
// Start Game
function startGame() {
    if (started) return;
    started = true;
    levelUp();
}

startBtn.addEventListener("click", startGame);
document.addEventListener("keypress", startGame);

// Flash Animations
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 300);
}
// Next Level
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    if (levelDisplay) {
        levelDisplay.innerText = level;
    }
    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
    console.log("Game Sequence:", gameSeq);
}
// Check Answer
function checkAns(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        if (level > highScore) {
            highScore = level;
            if (highDisplay) {
                highDisplay.innerText = highScore;
            }
        }
        h2.innerHTML = `
        Game Over!<br>
        Your Score : <b>${level}</b><br>
        Press Start or Any Key
        `;
        document.body.classList.add("gameOver");
        setTimeout(() => {
            document.body.classList.remove("gameOver");
        }, 500);
        reset();
    }
}
// Button Click
function btnPressed() {
    if (!started) return;
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("User:", userSeq);
    checkAns(userSeq.length - 1);
}
// Event Listeners
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPressed);

}
// Reset
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    if (levelDisplay) {
        levelDisplay.innerText = 0;
    }
}