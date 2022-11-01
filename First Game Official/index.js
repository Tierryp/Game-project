
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");





ctx.fillRect(0, 0, canvas.width, canvas.height);
// const img = new Image()
// img.src = l
let scoreFetcher = document.querySelector("span");
let score = 0;

class Player {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.attackBox = {
      width: 100,
      height: 50,
      color: "blue",
    };
    this.isAttacking;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
    
  //Only shows box if the "this.isAttacking  = true. Allows our hitbox to stay hidden." 
    if (this.isAttacking ){
    ctx.fillStyle = this.attackBox.color;
      ctx.fillRect(
      this.x,
      this.y - 50,
      this.attackBox.width,
      this.attackBox.height
    );
    }
  }

  attack() {
    //Setting a time so the defualt attacking isn't true all the time so "setTimeout" is setting a time that after attack is invoked we will set it back to false.
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
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
    this.x -= 3
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
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
    
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
      console.log("s pressed")
      break;
    case "Space":
      console.log("f pressed");
      player.attack()
      
      break;
  }
  

});

// function scoreAdder(Obstacle){
//     if (my){

//     }
// }
player.draw();

let myIntervalID;

const ObstacleArray = [];
let frameCount = 0;
animationLoop = () => {
  frameCount++;
  if (frameCount % 180 === 0) {
    const myNewObstacle = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      "green"
    );
    const myNewObstacle2 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      "green"
    );

    const myNewObstacle3 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      "green"
    );
    const myNewObstacle4 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      "green"
    );
    ObstacleArray.push(myNewObstacle);
    ObstacleArray.push(myNewObstacle2);
    ObstacleArray.push(myNewObstacle3);
    ObstacleArray.push(myNewObstacle4);
  }
  //ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  for (let i = ObstacleArray.length - 1; i >= 0; i--) {
    ObstacleArray[i].moveLeft();

    if (ObstacleArray[i].collisionCheck(player)) {
      clearInterval(myIntervalID);
    }
    ObstacleArray[i].draw();

    if (ObstacleArray[i].x < 0) {
      ObstacleArray.splice(i, 1);

      console.log(score);
    }
// If statement for hitbox collision. 
    if (
      player.x + player.attackBox.width >= ObstacleArray[i].x &&
      player.x  <= ObstacleArray[i].x + ObstacleArray[i].width &&
      player.y  + player.attackBox.height >= ObstacleArray[i].y &&
      player.y <= ObstacleArray[i].y + ObstacleArray[i].height  
     && player.isAttacking) {
      score++;
      scoreFetcher.innerHTML = score;
      player.isAttacking = false
      console.log("good");
      ObstacleArray.splice(i, 1);
    }
  }
};

myIntervalID = setInterval(animationLoop, 16);
