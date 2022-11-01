const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
// created black background by default
c.fillRect(0, 0, canvas.width, canvas.height);
//created class for sprite, using O.O.P so we do not have to use parameter and argument order makes code neat and easy to read..

const gravity = 0.2

class Sprite {
  constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 50
}
//created method for drawing our rectangle.. notice how fillStyle is before fillRect...
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  //created method for animating our squares and adding physics..
  update() {
    this.draw();
    
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y;
//adds else statement when its not equal to true 
    if (this.position.y + this.height + this.velocity.y >= canvas.height){
           this.velocity.y = 0
    } else this.velocity.y += gravity;
  }
   
  }
  

    

  


const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
//Adds fluidity to our movements. Adds last key to event listener so we can tap inbetween our keys
let lastKey 
// Animation loop. requestAnimationFrame seeks a function to use for 1 frame, turns out when we have that "frame" displayed we create another request due to that function being in there
function animationLoop() {
  window.requestAnimationFrame(animationLoop);
  //setting our fill style to black because we are changing our default fill style before drawing our background canvas because it is set to red @Ln:14 (for our rectangle cubes) to go back and not only "clear" our canvas background but it also  provides smooth transitions between the rectangles.
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  
  //We create this conditional to prevent Ln@81 errors. We increase our velocity within a conditional and set out value 'trues' within Event Listeners.
  if (keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -1;
  } else if (keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 1;
  } 
  }


// creating the constant to prevent "keydown" interventions and honestly a way better way of organizing key event listeners.. IMO.
const keys = {
a:{
  pressed:false
},

d:{
  pressed: false
},
space:{
pressed:false
}
}
animationLoop();
//Adding event listener for movement. Adding (event) to log keyboard events.
window.addEventListener('keydown',(event) => {

  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case " ":
      player.velocity.y = -10
      break;
  }

console.log(event.key)


})


//Adding keyup as a release, without it we would be looping constantly at the "a" key.
window.addEventListener('keyup',(event) => {

  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    
  }



})

