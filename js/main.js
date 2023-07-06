const btn = document.getElementById("btn");
const closa = document.getElementById("close");
const game = document.getElementById("game");
const result = document.getElementById("result");
const options = document.querySelectorAll("#game .option");
const user = document.getElementById("user");
const empty = document.getElementById("empty");
const pc = document.getElementById("pc");
const resultBox = document.getElementById("result-box");
const score = document.getElementById("score");
const restart = document.getElementById("restart");
const warning = document.getElementById("warning");
let youPicked;
let housePicked;
let counter = 0;

window.onload = function () {
   score.textContent = counter;
   if(window.innerHeight <= 550) {
    warning.classList.remove("none");
   } else {
    warning.classList.add("none");
   }
}

window.onresize = function () {
    if(window.innerHeight <= 550) {
        warning.classList.remove("none");
       } else {
        warning.classList.add("none");
       }
}

btn.onclick = function () {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
    document.querySelector(".rules").classList.add("visible");
    overlay.addEventListener("click", function () {
        this.remove();
        closa.parentElement.parentElement.classList.remove("visible");
    })
}

closa.onclick = function () {
    document.body.lastElementChild.remove();
    this.parentElement.parentElement.classList.remove("visible");
}

options.forEach(ele => {
    ele.addEventListener("click", function() {
        youPicked = this.getAttribute("data-option");
         game.classList.add("none");
         result.classList.remove("none");
         result.children[0].classList.add(this.children[0].children[0].alt);
         result.children[0].children[0].children[0].src = this.children[0].children[0].src;
         result.children[0].children[0].children[0].alt = this.children[0].children[0].alt;
         pcThink();
    })
})


function pcThink() {
    let answer = Array.from(document.querySelectorAll("#game .option"));
    let answer1 = Math.floor(Math.random() * answer.length);
    housePicked = answer[answer1].getAttribute("data-option");
    setTimeout(function() {
        empty.classList.add("none");
        pc.classList.add(answer[answer1].getAttribute("data-option"));
        pc.classList.remove("none");
        pc.children[0].children[0].src = answer[answer1].children[0].children[0].src;
        pc.children[0].children[0].alt = answer[answer1].children[0].children[0].alt;
        winner();

    },3000);
}

function winner() {
    if(youPicked === housePicked) {
      resultBox.children[0].textContent = "TIE";
      resultBox.classList.remove("none");
    } else if (youPicked === "scissors" && housePicked === "rock") {
        counter--;
        score.textContent = counter;
        resultBox.children[0].textContent = "YOU LOSE";
        resultBox.classList.remove("none");
        pc.classList.add("winner");
    } else if (youPicked === "scissors" && housePicked === "paper") {
        counter++;
        resultBox.children[0].textContent = "YOU WIN";
        resultBox.classList.remove("none");
        score.textContent = counter;
        user.classList.add("winner");
    } else if (youPicked === "paper" && housePicked === "scissors") {
        counter--;
        resultBox.children[0].textContent = "YOU LOSE";
        resultBox.classList.remove("none");
        score.textContent = counter;
        pc.classList.add("winner");
    } else if (youPicked === "paper" && housePicked === "rock") {
        counter++;
        resultBox.children[0].textContent = "YOU WIN";
        resultBox.classList.remove("none");
        score.textContent = counter;
        user.classList.add("winner");
    } else if (youPicked === "rock" && housePicked === "paper") {
        counter--;
        resultBox.children[0].textContent = "YOU LOSE";
        resultBox.classList.remove("none");
        score.textContent = counter;
        pc.classList.add("winner");
    } else if (youPicked === "rock" && housePicked === "scissors") {
        counter++;
        resultBox.children[0].textContent = "YOU WIN";
        resultBox.classList.remove("none");
        score.textContent = counter;
        user.classList.add("winner");
    }
}

restart.onclick = function () {
    game.classList.remove("none");
    result.classList.add("none");
    user.classList.remove(youPicked);
    user.classList.remove("winner");
    user.children[0].children[0].src = "";
    user.children[0].children[0].alt = "";
    resultBox.children[0].textContent = "";
    resultBox.classList.add("none");
    pc.classList.remove(housePicked);
    pc.classList.remove("winner");
    pc.classList.add("none");
    empty.classList.remove("none");
}