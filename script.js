// script.js

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the three emojis as Image objects
const rockImg = new Image();
rockImg.src = 'rock.png';

const paperImg = new Image();
paperImg.src = 'paper.png';

const scissorImg = new Image();
scissorImg.src = 'scissor.png';

// Define the array of objects
const objects = [];

// Create 10 rock objects
for (let i = 0; i < 20; i++) {
  objects.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 4 - 2,
    vy: Math.random() * 4 - 2,
    image: rockImg,
    type: 'rock'
  });
}

// Create 10 paper objects
for (let i = 0; i < 20; i++) {
  objects.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 4 - 2,
    vy: Math.random() * 4 - 2,
    image: paperImg,
    type: 'paper'
  });
}

// Create 10 scissor objects
for (let i = 0; i < 20; i++) {
  objects.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 4 - 2,
    vy: Math.random() * 4 - 2,
    image: scissorImg,
    type: 'scissor'
  });
}

// Collision detection function
function detectCollision(object1, object2) {
  return (
    object1.x < object2.x + object2.image.width &&
    object1.x + object1.image.width > object2.x &&
    object1.y < object2.y + object2.image.height &&
    object1.y + object1.image.height > object2.y
  );
}

// Handle collision between two objects
function handleCollision(object1, object2) {
  if (object1.type === object2.type) {
    // Do nothing if the objects have the same type
  } else if (
    (object1.type === 'rock' && object2.type === 'scissor') ||
    (object1.type === 'paper' && object2.type === 'rock') ||
    (object1.type === 'scissor' && object2.type === 'paper')
  ) {
    // Object 1 wins, transform object 2 into object 1
    object2.type = object1.type;
    object2.image = object1.image;
  } else {
    // Object 2 wins, transform object 1 into object 2
    object1.type = object2.type;
    object1.image = object2.image;
  }
}

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

// Loop through all objects and draw them
for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    ctx.drawImage(object.image, object.x, object.y);
    }
    
    // Loop through all pairs of objects and handle collisions
    for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
    const object1 = objects[i];
    const object2 = objects[j];
    if (detectCollision(object1, object2)) {
    handleCollision(object1, object2);
    }
    }
    }
    
    // Move all objects
    for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    object.x += object.vx;
    object.y += object.vy;
    
// Bounce off walls
if (object.x < 0 || object.x + object.image.width > canvas.width) {
    object.vx = -object.vx;
  }
  if (object.y < 0 || object.y + object.image.height > canvas.height) {
    object.vy = -object.vy;
  }

}

// Request the next animation frame
requestAnimationFrame(animate);
}

// Start the animation
animate();