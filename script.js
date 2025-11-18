let timeElement = document.querySelector(".timer");
let highElement = document.querySelector(".highscore");
let scoreElement = document.querySelector(".score");
let inputElement = document.querySelector("#user");
let btnElement = document.querySelector(".btn");
let numElement = document.querySelector(".num");

let clickright = new Audio("./assect/bubble-pop-04-323580.mp3");
let clickwrong = new Audio("./assect/rising-bubbly-pop-351023.mp3");
let score = 0;
let time = 60;
let num1, num2;

// Load high score from localStorage (default to 0 if nothing stored)
let highScore = JSON.parse(localStorage.getItem("highscoreEle")) || 0;
highElement.textContent = `High : ${highScore}`;


// Generate new random multiplication question
function numberFunction() {
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);
    numElement.textContent = `${num1} × ${num2}`;
}
numberFunction();


// Game timer
function timeFunction() {
    let timer = setInterval(() => {
        time--;
        timeElement.textContent = `Time : ${time}`;

        if (time <= 0) {
            clearInterval(timer);
            numElement.textContent = "Game Over!";
            inputElement.style.display = "none";
            btnElement.style.display = "none";
            scoreElement.style.display = "none";
            highElement.style.display = "none";
            timeElement.style.display = "none";
        }
    }, 1000);
}
timeFunction();


// Clicking submit button
btnElement.addEventListener("click", () => {
      
    let userAns = Number(inputElement.value);
    let correctAns = num1 * num2;

    if (userAns === correctAns) {
        score += 10;
        clickright.play();
    } else {
        score -= 5;
        clickwrong.play();
    }

    scoreElement.textContent = `Score : ${score}`;

    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highscoreEle", JSON.stringify(highScore));
        highElement.textContent = `High : ${highScore}`;
    }

    inputElement.value = "";
    numberFunction();
});
