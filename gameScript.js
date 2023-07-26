// declaring and initializing variable for stat
let startButton = document.getElementById("start");
let statPage = document.getElementById("stats");
let currentTrack = new Audio("Castlevania-VampireKiller.ogg");
let distance = 0;
let coins = 0;
let attempts = 0;

let distanceStat = document.getElementById("distance")
let coinsStat = document.getElementById("coins")
let attemptsStat = document.getElementById("attempts")

distanceStat.textContent = distance;
coinsStat.textContent = coins;
attemptsStat.textContent = attempts;
// event listener for the start button to go to the game mode
startButton.addEventListener("click", hideElements, false);
statPage.addEventListener("click", openStats, false);
// event listener for the stat page to go back to main
document.getElementById("statHeader").addEventListener("click", backToMain, false);
// event listener for going to the credit page
let creditsButton = document.getElementById("credits");

creditsButton.addEventListener("click", hideElements, false);
creditsButton.addEventListener("click", showCredits, false);
// event listener for going to the setting page or heading back from the setting page.
document.getElementById("settings").addEventListener("click", openSettings, false);

document.getElementById("settingTitle").addEventListener("click", backToMain, false);
// this hide the elements on the page
function hideElements()
{
    raiseUpElementbyID("mainContainer");
    document.getElementById("mainContainer").style.display = "none";
}
// show the page of stats
function openStats()
{  
    raiseUpElementbyID("mainContainer");
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("statContainer").style.display = "block";
    dropInElementbyID("statContainer");
}
// head back to main from different pages
function backToMain()
{
    raiseUpElementbyID("statContainer");
    raiseUpElementbyID("settingsBar");
    raiseUpElementbyID("Credits");
    document.getElementById("mainContainer").style.display = "block";
    document.getElementById("statContainer").style.display = "none";
    document.getElementById("settingsBar").style.display = "none";
    document.getElementById("Credits").style.display = "none";
    dropInElementbyID("mainContainer");
}
// show the credit page
function showCredits()
{
    let creditsPage = document.getElementById("Credits");
    creditsPage.style.display = "block";
    dropInElementbyID("Credits");
    document.getElementById("creditsHeader").addEventListener("click", backToMain, false);
}
// show the setting page
function openSettings()
{
    document.getElementById("settingsBar").style.display = "grid";
    dropInElementbyID("settingsBar");
    hideElements();
}

function dropInElementbyID(elementID) {
    let element = document.getElementById(elementID);
    element.style.position = "relative";
    element.style.bottom = "1000px";
    let pos = 1000;
    let movement = setInterval(moveDown, 3);
    function moveDown() {
        if (pos <= 0) {
            clearInterval(movement);
        } else {
            pos -= 10;
            element.style.bottom = pos + "px";
        }
    }
}
function raiseUpElementbyID(elementID) {
    let element = document.getElementById(elementID);
    element.style.position = "relative";
    let pos = 0;
    let movement = setInterval(moveUp, 3);
    function moveUp() {
        if (pos > 1000)
        {
            clearInterval(movement);
        }
        else
        {
            pos += 10;
            element.style.bottom = pos + "px";
        }
    }
}

function playAudio(url) {
    new Audio(url).play();
  }

