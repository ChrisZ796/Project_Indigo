let startButton = document.getElementById("start");

startButton.addEventListener("click", hideElements, false);

let creditsButton = document.getElementById("credits");

creditsButton.addEventListener("click", hideElements, false);
creditsButton.addEventListener("click", showCredits, false);

function hideElements()
{
    document.getElementById("header").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("stats").style.display = "none";
    document.getElementById("credits").style.display = "none";
    document.getElementById("settings").style.display = "none";

}

function showCredits()
{
    let creditsPage = document.createElement("img");
    creditsPage.src = "creditsScreen.png";
    creditsPage.alt = "credit screen image";
    creditsPage.style.position = "relative";
    creditsPage.style.width = "20vw";
    creditsPage.id = "creditsImg"
    document.getElementById("Credits").appendChild(creditsPage);

    creditsPage.addEventListener("click", showElements, false);
}

function showElements()
{
    document.getElementById("header").style.display = "block";
    document.getElementById("start").style.display = "block";
    document.getElementById("stats").style.display = "block";
    document.getElementById("credits").style.display = "block";
    document.getElementById("settings").style.display = "block";
    document.getElementById("creditsImg").remove();
}



