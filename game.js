let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
document.addEventListener("keydown",jump,false);
let isGameOver = false;
let gravity = 0;
let raf;
let text = document.getElementById("text");


let birdImage = new Image();
birdImage.src = "icon.png";

let pipeImage = new Image();
pipeImage.src = "birdPipe.png";

let downPipeImage = new Image();
downPipeImage.src = "birdPipeGoingDown.png";

let foregroundPicture = new Image();
foregroundPicture.src = "foreground.jpg";

class Bird{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

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

let bird = new Bird(10,300,80,80);
bird.draw();

let firstPipeGoingUp = new PipeUp(Math.random() * 1000 + 100, Math.random() * 800 + 100, 100, 800);
let firstPipeGoingDown = new PipeDown(firstPipeGoingUp.x, firstPipeGoingUp.y - 1100, 100, 800);

let foreground = new Foreground(0, 930, 2000, 100);
foreground.draw();

function jump(event){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let key = event.key;
    if (key == "ArrowUp"){
        bird.y -= 30;
        if (gravity == 0){
            gravity = 2;
            text.style.display = "none";
            gameLoop();
        }
    }
    if (key == "ArrowRight"){
        bird.x += 100;
    }

}



function gameLoop(){
    if (!isGameOver){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bird.x += 2;
        birdDrop();
        //The bottom property sets or returns the bottom position of a positioned element.
        //bird.y += "px"; 
        bird.draw();
        firstPipeGoingUp.draw();
        firstPipeGoingDown.draw();
        foreground.draw();
        if (bird.x >= canvas.width + 5){
            bird.x %= canvas.width;
            firstPipeGoingUp.x = Math.random() * 1000 + 100;
            firstPipeGoingUp.y = Math.random() * 800 + 100;
            firstPipeGoingDown.x = firstPipeGoingUp.x;
            firstPipeGoingDown.y = firstPipeGoingUp.y - 1100;
        }
        raf = requestAnimationFrame(gameLoop);
    }
    if (bird.y <= 0){
        isGameOver = true;
        window.cancelAnimationFrame(raf);
        
        isGameOver = false;
    }
}

function birdDrop(){
    bird.y += gravity;
}












