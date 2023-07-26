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
        for(let i=0;i<complexity;++i){
            pipesGoingUp[i].draw();
            pipesGoingDown[i].draw();
        }
        foreground.draw();
        if (bird.x >= canvas.width){
            createPipe(complexity);
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
    //Check the sets of pipes
    for(let i=0;i<complexity;++i){
        if(bird.x > pipesGoingUp[i].x - 50 && bird.x < pipesGoingUp[i].x + 100)
        {
            if(bird.y > pipesGoingUp[i].y - 50 || bird.y < pipesGoingDown[i].y + 800)
            {
                return true;
            }
        }
        else{
            return false;
        }
    }

}

function createPipe(pipeNum){
    for(let i=0; i<pipeNum;++i){
        PipeGoingUp = new PipeUp(Math.random() * 1000 + 100, Math.random() * 800 + 100, 100, 800);
        PipeGoingDown = new PipeDown(PipeGoingUp.x, PipeGoingUp.y - 1100, 100, 800);
        pipesGoingUp.push(PipeGoingUp);
        pipesGoingDown.push(PipeGoingDown);
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
let PipeGoingUp;
let PipeGoingDown;
let pipesGoingUp=[];
let pipesGoingDown=[];

let foreground = new Foreground(0, 930, 2000, 100);
foreground.draw();


let complexity=2;
createPipe(complexity);
gameLoop();











