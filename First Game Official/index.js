const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, canvas.width, canvas.height);
// const img = new Image()
// img.src = l
let scoreFetcher = document.querySelector("span")
let score = 0;





class Player {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
  }
  moveUp() {
    this.y -= 10;
  }
  moveDown() {
    this.y += 10;
  }
}

class Obstacle extends Player {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
  }

  moveLeft() {
    this.x -= (3 + score) ;

  }
  collisionCheck(Obstacle) {
    if (
      this.x < Obstacle.x + Obstacle.width &&
      this.x + this.width > Obstacle.x &&
      this.y < Obstacle.y + Obstacle.height &&
      this.height + this.y > Obstacle.y
    ) {
      console.log("detected");
      // Collision detected!
      return true;
    } else {
      // No collision
      return false;
    }
  }

  
}

const Obstacles = new Obstacle(
  canvas.width,
  canvas.height - 50,
  50,
  50,
  "blue"
);
const player = new Player(50, canvas.height / 2.5, 50, 50, "red");
player.draw();

window.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "KeyW":
      player.moveUp();
      break;
    case "KeyS":
      player.moveDown();
      break;
  }
 
});

// function scoreAdder(Obstacle){
//     if (my){
    
//     }
// }
 player.draw();
 
 let myIntervalID

const ObstacleArray = [];
let frameCount = 0;
animationLoop = () => {
  frameCount++;
  if(frameCount % 180 === 0) {
const myNewObstacle = new Obstacle(canvas.width, Math.random() * canvas.height , 50,50, "green")
const myNewObstacle2 = new Obstacle(
  canvas.width,
  Math.random() * canvas.height,
  50,
  50,
  "green"
);
ObstacleArray.push(myNewObstacle);
ObstacleArray.push(myNewObstacle2)
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  for (let i = ObstacleArray.length - 1; i >= 0; i--) {
    ObstacleArray[i].moveLeft();



    if (ObstacleArray[i].collisionCheck(player)) {
      clearInterval(myIntervalID);
    }
    ObstacleArray[i].draw();

  

    if (ObstacleArray[i].x < 0) {
      ObstacleArray.splice(i, 1);
    score++
    console.log(score)
    scoreFetcher.innerHTML = score;
    }
    
}

};


myIntervalID = setInterval(animationLoop, 16);
