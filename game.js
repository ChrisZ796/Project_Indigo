let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
document.addEventListener("keydown",jump,false);
let isGameOver = false;
let gravity = 0;
let raf;


let birdImage = new Image();
birdImage.src = "icon.png";


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

let bird = new Bird(10,300,80,80);
bird.draw();

function jump(event){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let key = event.key;
    if (key == "ArrowUp"){
        bird.y -= 25;
        if (gravity == 0){
            gravity = 2;
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
        //gravity 
        birdDrop(); 
        //reset the bird position
        bird.draw();
        if (bird.x >= canvas.width + 5){
            bird.x %= canvas.width;
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









