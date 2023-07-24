let startButton = document.getElementById("start");

startButton.addEventListener("click", hideElements, false);

function hideElements()
{
    document.getElementById("header").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("stats").style.display = "none";
    document.getElementById("credits").style.display = "none";
    document.getElementById("settings").style.display = "none";
}