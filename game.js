let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
document.addEventListener("keydown",jump,false);
let isGameOver = false;
let velocity = 0;
let raf;
let text = document.getElementById("text");
let gravity = 0.1;
let gameIsRunning = false;
let birdImage = new Image();
birdImage.src = "icon.png";


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

let bird = new Bird(10,300,80,80);
bird.draw();

gameLoop();

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
        // console.log(bird.y);
        // console.log("1");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bird.x = bird.x + 2;
        bird.x = bird.x % canvas.width;
        //The effect of gravity
        bird.dy = bird.dy + gravity;
        //The bottom property sets or returns the bottom position of a positioned element.
        //bird.y += "px"; 
        bird.y = bird.y + bird.dy;
        bird.draw();

        
        
    }
    if (bird.y >= canvas.height){
        isGameOver = true;
        window.cancelAnimationFrame(raf);
    }
    raf = window.requestAnimationFrame(gameLoop);
}

function birdDrop(){
    // let finalVelocity = velocity + gravity;
    // if(isFlying){
    //     console.log(finalVelocity);
    //     bird.y -= finalVelocity;
    // }else{
    //     bird.y += finalVelocity;
    // }
    bird.dy = bird.dy - 2;
    
}









