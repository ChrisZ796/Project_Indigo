let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
document.addEventListener("keydown",jump,false);
let isGameOver = false;
let gravity = 0.05;
let windSpeed = 0;
let hasOxygen = false;
let raf;
let endgame = document.getElementById("endGame");
endgame.style.display = "none";
let text = document.getElementById("text");
//New Bird Mechanics
let velocity = 0;
let gameIsRunning = false;
let pipeGap = 300;
let soundCount = 0;
let musicCount = 0;
let scoreElement = document.getElementById("score");
let score = 0;
let oxygenElement = document.getElementById("oxygenValue"); // Select the oxygen display element
let oxygen = 100;
const oxygenDecreaseRate = 0.07; // Adjust this value to control the oxygen decrease rate
const oxygenReplenishAmount = 40; // Adjust this value to control how much oxygen is replenished when the bird passes through a gap
scoreElement.textContent = score;
let highScore = 0;
let attempts = Number(localStorage.getItem("attempts"));
let currentPlanet = localStorage.getItem("currentPlanet");
scoreElement.textContent = score;

class Bird {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.width = width;
        this.height = height;
        this.rotation = 0; // New property to store rotation angle
    }
    draw() {
        ctx.save(); // Save the current canvas state
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Translate to the center of the bird
        ctx.rotate(this.rotation); // Apply rotation
        ctx.drawImage(birdImage, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the bird
        ctx.restore(); // Restore the previous canvas state
    }
    reset(){
        this.x = 10;
        this.y = 300;
        this.dy = 0;
        isGameOver = false;
    }
}

class PipeUp
{
    constructor(x,y,width,height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw()
    {
        ctx.beginPath();
        ctx.drawImage(pipeImage, this.x, this.y, this.width, this.height);
    }
}

class PipeDown
{
    constructor(x,y,width,height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw()
    {
        ctx.beginPath();
        ctx.drawImage(downPipeImage, this.x, this.y, this.width, this.height);
    }
}

class Foreground
{
    constructor(x,y,width,height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw()
    {
        ctx.beginPath();
        ctx.drawImage(foregroundPicture, this.x, this.y, this.width, this.height);
    }
}

function jump(event){
    gameIsRunning = true;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let key = event.key;
    if (key == "ArrowUp"){
        if(musicCount == 0)
        {
            new Audio(src = "Castlevania-VampireKiller.ogg").play();
            musicCount++;
        }
        new Audio(src = "Flap.mp3").play();
        bird.rotation = -1;
        birdDrop();
        text.style.display = "none";
    }
    if (key == "e"){
        document.getElementById("musicTrack").play();
        isGameOver = false;
        gameIsRunning = false;
        bird.reset();
        resetPipe();
        soundCount = 0;
        musicCount = 0;
        foreground.draw();
        score = 0;
        scoreElement.textContent = 0;
        endgame.style.display =  "none";
        text.style.display = "block";
        oxygen += oxygenReplenishAmount;
    }

}

function resetPipe(){
    firstPipeGoingUp.x = Math.random() * 800 + 300;
    firstPipeGoingUp.y = Math.random() * 800 + 100;
    firstPipeGoingDown.x = firstPipeGoingUp.x;
    firstPipeGoingDown.y = firstPipeGoingUp.y - 800 - pipeGap;
    secondPipeGoingUp.x = Math.random() * 400 + 400 + firstPipeGoingUp.x;
    secondPipeGoingUp.y = Math.random() * 500 + 500;
    secondPipeGoingDown.x = secondPipeGoingUp.x;
    secondPipeGoingDown.y = secondPipeGoingUp.y - 800 - pipeGap;
    if(secondPipeGoingUp.x >= canvas.width)
    {
        resetPipe();
    }
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isGameOver && gameIsRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        initGame();
        bird.x += 2 + score/5 + windSpeed;
        oxygen -= oxygenDecreaseRate;

        // Calculate rotation angle based on bird's velocity
        //bird.rotation = Math.atan2(bird.dy, 2) + Math.PI / 2;
        //bird.x = bird.x % canvas.width;
        bird.dy = bird.dy + gravity;
        bird.y = bird.y + bird.dy;
        if(bird.rotation < 1)
        {
            bird.rotation += 0.01;
        }
        bird.draw();
        firstPipeGoingUp.draw();
        firstPipeGoingDown.draw();
        secondPipeGoingUp.draw();
        secondPipeGoingDown.draw();
        foreground.draw();
        if (bird.x >= firstPipeGoingUp.x && bird.x <= firstPipeGoingUp.x + firstPipeGoingUp.width) {
            // Replenish oxygen when the bird passes through the gap
            firstPipeGoingUp.isPassed = true;
            oxygen += oxygenReplenishAmount;
        }
        if (bird.x >= secondPipeGoingUp.x && bird.x <= secondPipeGoingUp.x + secondPipeGoingUp.width) {
            // Replenish oxygen when the bird passes through the gap
            secondPipeGoingUp.isPassed = true;
            oxygen += oxygenReplenishAmount;
        }
        else
        {
            firstPipeGoingDown.isPassed = false;
            secondPipeGoingUp.isPassed = false;
        }
        oxygen = Math.max(0, Math.min(100, oxygen));
        oxygenElement.textContent = Math.round(oxygen);
        if (oxygen <= 0) {
          isGameOver = true;
          endgame.style.display = "block";
          window.cancelAnimationFrame(raf);
          if (soundCount == 0) {
            new Audio(src = "Death.mp3").play();
            soundCount++;
            }
          }
          if (bird.x >= canvas.width) {
            new Audio(src = "Point.mp3").play();
            resetPipe();
            bird.x = 0;
            score++;
            scoreElement.textContent = score;
          }
        }
        if (bird.x >= canvas.width)
        {
            new Audio(src = "Point.mp3").play();
            resetPipe();
            bird.x = 0;
            score++;
            scoreElement.textContent = score;
        }
        if (bird.y >= 930 || inDanger()) {
            isGameOver = true;
            endgame.style.display = "block";
            window.cancelAnimationFrame(raf);
            document.getElementById("musicTrack").pause();
            attempts++;
            sessionStorage.setItem("attempts", attempts);
            if(score > highScore)
            {
                highScore = score;
                sessionStorage.setItem("numHighScore", highScore);
            }
            if(soundCount == 0)
            {
                new Audio(src = "Death.mp3").play();
                soundCount++;
            }
        }
    raf = window.requestAnimationFrame(gameLoop);
}

function birdDrop(){
    bird.dy = -3;
}

function inDanger()
{
    //Check the first set of pipes
    if(bird.x > firstPipeGoingUp.x - 50 && bird.x < firstPipeGoingUp.x + 100)
    {
        if(bird.y > firstPipeGoingUp.y - 50 || bird.y < firstPipeGoingDown.y + 770)
        {
            return true;
        }
    }
    //Check the second set of pipes
    else if(bird.x > secondPipeGoingUp.x - 50 && bird.x < secondPipeGoingUp.x + 100)
    {
        if(bird.y > secondPipeGoingUp.y - 50 || bird.y < secondPipeGoingDown.y + 770)
        {
            return true;
        }
    }
    else
    {
        return false;
    }
    if (bird.x > firstPipeGoingUp.x - 50 && bird.x < firstPipeGoingUp.x + 100 &&
        bird.y > firstPipeGoingUp.y - 50 && bird.y < firstPipeGoingUp.y + 800 - pipeGap) {
            firstPipeGoingUp.isPassed = true;
        }
    
    if (bird.x > secondPipeGoingUp.x - 50 && bird.x < secondPipeGoingUp.x + 100 &&
        bird.y > secondPipeGoingUp.y - 50 && bird.y < secondPipeGoingUp.y + 800 - pipeGap) {
            secondPipeGoingUp.isPassed = true;
        }
}

function initGame()
{
    let background;
    if(currentPlanet == "EARTH")
    {
        document.getElementById("canvas").style.backgroundImage = "url('earthBackdrop.jpg')";
        gravity = 0.05;
        windSpeed = 0;
    }
    else if(currentPlanet == "MOON")
    {
        document.getElementById("canvas").style.backgroundImage = "url('Moon Landscape.png')";
        gravity = 0.02;
        windSpeed = -0.5;
    }
    else if(currentPlanet == "ARGONIA")
    {
        document.getElementById("canvas").style.backgroundImage = "url('Argonia Landscape.jpg')";
        gravity = 0.1;
        windSpeed = -1;
    }
    else if(currentPlanet == "JUBILEE")
    {
        document.getElementById("canvas").style.backgroundImage = "url('Jubilee Landscape.jpg')";
        gravity = 0.04;
        windSpeed = 2;
    }
}


let birdImage = new Image();
birdImage.src = "icon.png";

let pipeImage = new Image();
pipeImage.src = "birdPipe.png";

let downPipeImage = new Image();
downPipeImage.src = "birdPipeGoingDown.png";

let foregroundPicture = new Image();
foregroundPicture.src = "foregroundEarth.jpg";

let bird = new Bird(10,300,80,80);
bird.draw();

let firstPipeGoingUp = new PipeUp(Math.random() * 800 + 300, Math.random() * 800 + 100, 100, 800);
let firstPipeGoingDown = new PipeDown(firstPipeGoingUp.x, firstPipeGoingUp.y - 800 - pipeGap, 100, 800);

let secondPipeGoingUp = new PipeUp(Math.random() * 400 + 400 + firstPipeGoingUp.x, Math.random() * 500 + 500, 100, 800);
let secondPipeGoingDown = new PipeDown(secondPipeGoingUp.x, secondPipeGoingUp.y - 800 - pipeGap, 100, 800);

if(secondPipeGoingUp.x >= canvas.width)
{
    resetPipe();
}

let foreground = new Foreground(0, 930, 2000, 100);
foreground.draw();

initGame();
gameLoop();