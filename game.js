let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
document.addEventListener("keydown",jump,false);
let isGameOver = false;
let gravity = 0.05;
let raf;
let text = document.getElementById("text");
//New Bird Mechanics
let velocity = 0;
let gameIsRunning = false;

class Bird{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.width = width;
        this.height = height;

    }
    rotate(degrees) {
        this.angle += degrees;
        if (this.angle > 360) {
            this.angle -= 360;
        }
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(birdImage,this.x,this.y,this.width,this.height);
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
        birdDrop();
        text.style.display = "none";
    }
    if (key == "ArrowRight"){
        bird.x += 100;
    }

}



function gameLoop(){
    if (!isGameOver && gameIsRunning){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bird.x += 2;
        //bird.x = bird.x % canvas.width;
        //The effect of gravity
        bird.dy = bird.dy + gravity;
        bird.y = bird.y + bird.dy;
        bird.draw();
        firstPipeGoingUp.draw();
        firstPipeGoingDown.draw();
        secondPipeGoingUp.draw();
        secondPipeGoingDown.draw();
        foreground.draw();
        if (bird.x >= canvas.width)
        {
            bird.x = 0;
            firstPipeGoingUp.x = Math.random() * 1000 + 500;
            firstPipeGoingUp.y = Math.random() * 800 + 100;
            firstPipeGoingDown.x = firstPipeGoingUp.x;
            firstPipeGoingDown.y = firstPipeGoingUp.y - 1100;
            secondPipeGoingUp.x = Math.random() * 1000 + 500;
            secondPipeGoingUp.y = Math.random() * 800 + 100;
            secondPipeGoingDown.x = secondPipeGoingUp.x;
            secondPipeGoingDown.y = secondPipeGoingUp.y - 1100;
        }
    
    if (inDanger()) {
        // Do nothing here, the rotation and falling is handled in the inDanger() function
    } else {
        bird.draw(); // Redraw the bird normally if it's not in danger
    }
}
    if (bird.y >= 870 || inDanger()) {
        isGameOver = true;
        window.cancelAnimationFrame(raf);
    }
    raf = window.requestAnimationFrame(gameLoop);
}

function birdDrop(){
    bird.dy = -2;
}

function inDanger()
{
    //Check the first set of pipes
    if(bird.x > firstPipeGoingUp.x - 50 && bird.x < firstPipeGoingUp.x + 100)
    {
        if(bird.y > firstPipeGoingUp.y - 50 || bird.y < firstPipeGoingDown.y + 800)
        {
            bird.rotate(-90);
            bird.dy = -5;
            return true;
        }
    }
    //Check the second set of pipes
    else if(bird.x > secondPipeGoingUp.x - 50 && bird.x < secondPipeGoingUp.x + 100)
    {
        if(bird.y > secondPipeGoingUp.y - 50 || bird.y < secondPipeGoingDown.y + 800)
        {
            bird.rotate(-90);
            bird.dy = -5;
            return true;
        }
    }
    else
    {
        return false;
    }
    
}

let birdImage = new Image();
birdImage.src = "icon.png";

let pipeImage = new Image();
pipeImage.src = "birdPipe.png";

let downPipeImage = new Image();
downPipeImage.src = "birdPipeGoingDown.png";

let foregroundPicture = new Image();
foregroundPicture.src = "foreground.jpg";

let bird = new Bird(10,300,80,80);
bird.draw();

let firstPipeGoingUp = new PipeUp(Math.random() * 1000 + 100, Math.random() * 800 + 100, 100, 800);
let firstPipeGoingDown = new PipeDown(firstPipeGoingUp.x, firstPipeGoingUp.y - 1100, 100, 800);

let secondPipeGoingUp = new PipeUp(Math.random() * 1000 + 100, Math.random() * 800 + 100, 100, 800);
let secondPipeGoingDown = new PipeDown(secondPipeGoingUp.x, secondPipeGoingUp.y - 1100, 100, 800);

let foreground = new Foreground(0, 930, 2000, 100);
foreground.draw();

gameLoop();