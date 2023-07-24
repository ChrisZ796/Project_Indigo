let startButton = document.getElementById("start");
let statPage = document.getElementById("stats");
let distance = 0;
let coins = 0;
let attempts = 0;

let distanceStat = document.getElementById("distance")
let coinsStat = document.getElementById("coins")
let attemptsStat = document.getElementById("attempts")

distanceStat.textContent = distance;
coinsStat.textContent = coins;
attemptsStat.textContent = attempts;

startButton.addEventListener("click", hideElements, false);
statPage.addEventListener("click", openStats, false);

document.getElementById("return").addEventListener("click", backToMain, false);

function hideElements()
{
    document.getElementById("mainContainer").style.display = "none";
}
function openStats()
{
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("statContainer").style.display = "block";
}

function backToMain()
{
    document.getElementById("mainContainer").style.display = "block";
    document.getElementById("statContainer").style.display = "none";
}
