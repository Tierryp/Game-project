const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, canvas.width, canvas.height);

let scoreFetcher = document.querySelector("span");
let score = 0;




const player = new Player(50, canvas.height / 2.5, 50, 50, gokuImg, gokuAttackImg);
const Obstacles = new Obstacle(
  canvas.width,
  canvas.height - 50,
  50,
  50,
  majinBuu
);
player.draw();

window.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "KeyW":
      player.moveUp();
      break;
    case "KeyS":
      player.moveDown();
      console.log("s pressed");
      break;
    case "Space":
      console.log("f pressed");
      player.attack();

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
      majinBuu
    );
    const myNewObstacle2 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );

    const myNewObstacle3 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );
    const myNewObstacle4 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );
    ObstacleArray.push(myNewObstacle);
    ObstacleArray.push(myNewObstacle2);
    ObstacleArray.push(myNewObstacle3);
    ObstacleArray.push(myNewObstacle4);
  }
  //ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  background2.update()
  background3.update()
  cloud.update()
  cloud2.update()
  cloud3.update()
  cloud4.update()
  cloud5.update()
  
  
  player.draw();
  if (frameCount % 15 === 0) {
    player.spriteFrame++;
    player.spriteFrame = player.spriteFrame % 4;
  }
  
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
      player.x <= ObstacleArray[i].x + ObstacleArray[i].width &&
      player.y + player.attackBox.height >= ObstacleArray[i].y &&
      player.y <= ObstacleArray[i].y + ObstacleArray[i].height &&
      player.isAttacking
    ) {
      score++;
      scoreFetcher.innerHTML = score;
      player.isAttacking = false;
      console.log("good");
      ObstacleArray.splice(i, 1);
    }
  }
};

myIntervalID = setInterval(animationLoop, 16);
